import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

import WidgetDisplay from '../WidgetDisplay'
import WidgetForm from '../WidgetForm'
import {
  fetchAllWidgets,
  fetchWidgetByName,
  deleteWidget,
  createWidget,
  updateWidget
} from '../../lib/apiConnect'

const WidgetList = () => {
  const [widgets, setWidgets] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);


  useEffect(() => {
    refreshWidgets()
  }, [])

  const refreshWidgets = () => {
    setLoading(true);
    fetchAllWidgets()
      .then(data => {
        setWidgets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching widgets', error);
        setError(error);
        setLoading(false);
      });
  }

  const handleCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleEdit = (widget) => {
    setEditTarget(widget);
    setFormOpen(true);
  };

  const handleDelete = (name) => {
    deleteWidget(name).then(refreshWidgets);
  };

  const handleFormSubmit = (data) => {
    const action = editTarget ? updateWidget(data.name, data) : createWidget(data);
    action.then(() => {
      setFormOpen(false);
      refreshWidgets();
    });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearchError(null);
    fetchWidgetByName(searchTerm)
      .then((widget) => {
        setSearchResult(widget);
        setLoading(false);
      })
      .catch((err) => {
        setSearchError(`Widget "${searchTerm}" not found.`);
        setSearchResult(null);
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResult(null);
    refreshWidgets();
  };


  if (loading) return <Typography>Loading widgets...</Typography>;
  if (error) return <Typography color="error">Error loading widgets.</Typography>;

  return (
    <Stack spacing={4} sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}>
      <Button onClick={handleCreate} variant="contained" sx={{ alignSelf: 'center' }}>
        + Add Widget
      </Button>

      <Stack direction="row" spacing={2} justifyContent="center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by widget name"
          style={{ padding: '0.5em', fontSize: '1em', width: '300px' }}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <Button variant="outlined" onClick={clearSearch}>Clear</Button>
      </Stack>

      {searchError && (
        <Typography color="error" textAlign="center">{searchError}</Typography>
      )}

      <WidgetForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editTarget}
      />

      <Typography sx={{ textAlign: 'center' }} variant="h3">
        List of widgets:
      </Typography>
      <Grid container justifyContent="center" spacing={4} sx={{ paddingRight: 4, width: '100%' }}>
        {widgets.length === 0 ? (
          <Typography>You have no available widgets. Please create some!</Typography>
        ) : (
          searchResult ? (
            <WidgetDisplay
              widget={searchResult}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            widgets.map((current, index) => <WidgetDisplay
              key={current.name}
              widget={current}
              onEdit={handleEdit}
              onDelete={handleDelete} />)
          )
        )}
      </Grid>
    </Stack>
  )
}

export default WidgetList
