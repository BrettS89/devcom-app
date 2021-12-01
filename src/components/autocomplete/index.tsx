//@ts-nocheck

import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  options: any[];
  loading: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
  onInput?(term: any): void;
  onChange: any;
  getOptionLabel?: any;
  open: boolean;
  onClose: any;
  autoRef: any
}

const CustomAutoComplete: React.FC<Props> = ({ loading, options = [], getOptionLabel, open, onClose, onChange, autoRef, ...rest }) => {

  return (
    <>
      <Autocomplete
        
        onClose={onClose}
        onChange={onChange}
        open={open}
        noOptionsText={undefined}
        loading={loading}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={params => 
          <TextField
            {...params}
            {...rest}
            inputRef={autoRef}
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        }
        size='small'
        
      />
    </>
  );
};

export default CustomAutoComplete;
