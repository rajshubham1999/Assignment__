


import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/lab'; // Import DatePicker component from MUI lab
import data from './data.json'; // Assuming data is correctly structured in data.json
import GroupedDataTable from './GroupedDataTable';
import moment from 'moment'; // Import moment.js for date handling
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table'; // Import useMaterialReactTable and MaterialReactTable from your library

const DataTable = () => {
  const [columns, setColumns] = useState([
    { accessorKey: 'name', header: 'Name', show: true },
    { accessorKey: 'category', header: 'Category', show: true },
    { accessorKey: 'subcategory', header: 'Subcategory', show: true },
    { accessorKey: 'createdAt', header: 'Created At', show: true },
    { accessorKey: 'updatedAt', header: 'Updated At', show: true },
    { accessorKey: 'price', header: 'Price', show: true },
    { accessorKey: 'sale_price', header: 'Sale Price', show: true },
  ]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState('category'); // Default group by category
  const [groupByColumnHeader, setGroupByColumnHeader] = useState('Category'); // Dynamic group by column header
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isSortByDataOpen, setSortByDataOpen] = useState(false);
  const [sortByOptions, setSortByOptions] = useState({
    id: '',
    name: '',
    category: '',
    subcategory: '',
    price: '',
    sale_price: '',
    createdAt: null,
    updatedAt: null,
  });

  useEffect(() => {
    // Simulating fetching data from JSON file (in real app, use actual fetch logic)
    setDataList(data);
  }, []);

  const toggleDrawer = (content) => {
    setDrawerOpen(!isDrawerOpen);
    setDrawerContent(content);
  };

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
    setSortByDataOpen(false); // Close sort by data panel if open
  };

  const toggleSortByData = () => {
    setSortByDataOpen(!isSortByDataOpen);
  };

  const handleColumnToggle = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.accessorKey === columnId ? { ...col, show: !col.show } : col
      )
    );
  };

  const handleGroupByChange = (event) => {
    setSelectedGroupBy(event.target.value);
    setGroupByColumnHeader(event.target.value === 'category' ? 'Category' : 'Subcategory');
  };

  const handleApplyGrouping = () => {
    if (selectedGroupBy === 'category' || selectedGroupBy === 'subcategory') {
      const grouped = dataList.reduce((acc, item) => {
        const key = item[selectedGroupBy];
        if (!acc[key]) {
          acc[key] = { [groupByColumnHeader]: key, items: [] };
        }
        acc[key].items.push(item);
        return acc;
      }, {});
      setGroupedData(Object.values(grouped));
      toggleDrawer(false); // Close drawer after applying grouping
    }
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category))];
  const uniqueSubcategories = [...new Set(data.map((item) => item.subcategory))];

  const handleSortByChange = (field, value) => {
    setSortByOptions((prevOptions) => ({
      ...prevOptions,
      [field]: value,
    }));
  };

  const handleApplySorting = () => {
    // Filter and sort data based on sortByOptions
    const filteredData = dataList.filter((item) =>
      Object.keys(sortByOptions).every((key) => {
        if (!sortByOptions[key]) return true; // Skip empty values
        if (key === 'name') {
          return item[key].toLowerCase().includes(sortByOptions[key].toLowerCase());
        } else if (key === 'category' || key === 'subcategory') {
          return item[key].toLowerCase().includes(sortByOptions[key].toLowerCase());
        } else {
          return item[key].toString().includes(sortByOptions[key]);
        }
      })
    );

    const sortedData = filteredData.sort((a, b) => {
      const key = Object.keys(sortByOptions).find((key) => sortByOptions[key]);
      if (!key) return 0;

      if (key === 'name') {
        return a[key].localeCompare(b[key]);
      } else {
        return a[key] - b[key];
      }
    });

    setDataList(sortedData);
    toggleFilter(); // Close filter drawer after applying sorting
  };

  // Initialize table instance with useMaterialReactTable hook
  const table = useMaterialReactTable({
    columns,
    data: dataList,
    enableRowNumbers: true,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      shape: "rounded",
    },
    initialState: {
      pagination: { pageSize: 10 }, // Example: Initial pagination settings
      sorting: [], // Example: Initial sorting settings
      filtering: [], // Example: Initial filtering settings
    },
  });

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <h2>Advanced Table</h2>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => toggleDrawer(true)}>
          Group Data
        </Button>
        <Button variant="contained" color="primary" onClick={toggleFilter}>
          Filter
        </Button>
      </Box>
      {groupedData.length === 0 ? (
        <MaterialReactTable table={table} />
      ) : (
        <GroupedDataTable groupedData={groupedData} groupByColumnHeader={groupByColumnHeader} />
      )}

      {/* Drawer for column management and group by */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <h3>View/Hide Columns</h3>
          {columns.map((col) => (
            <FormControlLabel
              key={col.accessorKey}
              control={<Checkbox checked={col.show} onChange={() => handleColumnToggle(col.accessorKey)} />}
              label={col.header}
            />
          ))}
        </Box>
        <Box sx={{ width: 300, padding: 2 }}>
          <h3>Group By</h3>
          <FormControl fullWidth sx={{ marginBottom: 1 }}>
            <InputLabel>Select Group By</InputLabel>
            <Select
              value={selectedGroupBy}
              onChange={handleGroupByChange}
              sx={{ marginTop: 1 }}
            >
              <MenuItem value="category">Category</MenuItem>
              <MenuItem value="subcategory">Subcategory</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleApplyGrouping} sx={{ mt: 2 }}>
            Apply
          </Button>
        </Box>
      </Drawer>

      {/* Drawer for filter and sorting */}
      <Drawer anchor="right" open={isFilterOpen} onClose={toggleFilter}>
        <Box sx={{ width: 300, padding: 2 }}>
          <h3>Filter</h3>
          <Button variant="contained" color="primary" onClick={toggleSortByData} sx={{ mt: 2 }}>
            Sort by Data
          </Button>
          {isSortByDataOpen && (
            <>
              <TextField
                fullWidth
                label="ID"
                value={sortByOptions.id}
                onChange={(e) => handleSortByChange('id', e.target.value)}
                sx={{ mb: 1, mt: 1 }}
              />
              <TextField
                fullWidth
                label="Name"
                value={sortByOptions.name}
                onChange={(e) => handleSortByChange('name', e.target.value)}
                sx={{ mb: 1, mt: 1 }}
              />
              <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={sortByOptions.category}
                  onChange={(e) => handleSortByChange('category', e.target.value)}
                  sx={{ marginTop: 1 }}
                >
                  <MenuItem value="">Category</MenuItem>
                  {uniqueCategories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={sortByOptions.subcategory}
                  onChange={(e) => handleSortByChange('subcategory', e.target.value)}
                  sx={{ marginTop: 1 }}
                >
                  <MenuItem value="">Subcategory</MenuItem>
                  {uniqueSubcategories.map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Price"
                value={sortByOptions.price}
                onChange={(e) => handleSortByChange('price', e.target.value)}
                sx={{ mb: 1, mt: 1 }}
              />
              <TextField
                fullWidth
                label="Sale Price"
                value={sortByOptions.sale_price}
                onChange={(e) => handleSortByChange('sale_price', e.target.value)}
                sx={{ mb: 1, mt: 1 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  fullWidth
                  label="Created At"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={moment(sortByOptions.createdAt).format('YYYY-MM-DD')}
                  onChange={(e) => handleSortByChange('createdAt', moment(e.target.value).toDate())}
                  sx={{ mb: 1, mt: 1 }}
                />
                <TextField
                  fullWidth
                  label="Updated At"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={moment(sortByOptions.updatedAt).format('YYYY-MM-DD')}
                  onChange={(e) => handleSortByChange('updatedAt', moment(e.target.value).toDate())}
                  sx={{ mb: 1, mt: 1 }}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={handleApplySorting} sx={{ mt: 2 }}>
                Apply
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default DataTable;



