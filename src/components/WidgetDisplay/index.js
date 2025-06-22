import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const DisplayWidget = ({ widget, onEdit, onDelete }) => {
  const { description, name, price } = widget

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => onEdit(widget)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => onDelete(name)}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DisplayWidget