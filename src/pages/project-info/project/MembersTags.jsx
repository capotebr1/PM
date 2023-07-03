import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function MembersTags({ taskMembers }) {
    console.log(taskMembers);
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={taskMembers}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
