import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress, AutocompleteProps, MenuItem, ListItemText } from "@mui/material";
import { useMemo, useState } from "react";
import { delay } from "@/utils/delay";

export type Option = {
  id: string | number;
  label: string;
  secondary?: string | number;
};

type CustomAutoCompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  startingValue?: Option | null;
  loading?: boolean;
  inputChangeDebounceMs?: number;
} & Omit<AutocompleteProps<Option, boolean, boolean, false>, "renderInput">;

function CustomAutoComplete({
  name,
  label,
  placeholder,
  startingValue,
  loading,
  inputChangeDebounceMs,
  onInputChange,
  ...autocompleteProps
}: CustomAutoCompleteProps) {
  const [value, setValue] = useState<Option | Option[] | null>(startingValue || null);

  const [handleDebounce] = useMemo(
    () => delay((onInputChange, ...args) => onInputChange(...args), inputChangeDebounceMs || 300),
    [inputChangeDebounceMs]
  );

  const { control, resetField } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={value}
          onInputChange={(...args) => {
            if (onInputChange) {
              if (inputChangeDebounceMs !== undefined) {
                handleDebounce(onInputChange, ...args);
              } else {
                onInputChange(...args);
              }
            }
          }}
          onChange={(_, newValue) => {
            setValue(newValue);
            if (Array.isArray(newValue)) {
              onChange(newValue.map(option => option.id));
            } else if (newValue) {
              onChange(newValue?.id);
            } else {
              resetField(name);
            }
          }}
          getOptionLabel={option => {
            if (typeof option === "object" && option !== null) return option.label;
            else return "";
          }}
          getOptionKey={option => option.id || ""}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.id} value={option.id}>
              <ListItemText primary={option.label} secondary={option.secondary} />
            </MenuItem>
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          {...autocompleteProps}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              label={label}
              error={!!error}
              helperText={error?.message}
              placeholder={placeholder}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  ...params.slotProps.input,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress color="inherit" size={20} />}
                      {params.slotProps.input?.endAdornment}
                    </>
                  )
                }
              }}
            />
          )}
        />
      )}
    />
  );
}

export default CustomAutoComplete;

// import { useEffect, useState, useMemo } from 'react'
// import { Controller, useFormContext } from 'react-hook-form'
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   AutocompleteProps,
//   TextFieldProps,
//   MenuItem,
//   ListItemText
// } from '@mui/material'
// import { delay } from '@/@core/utils/delay'

// interface Option {
//   id: string | number
//   label: string
//   secondary?: string | number
// }

// type CustomAutoCompleteProps = {
//   name: string
//   label?: string
//   fetchOptions: (search: string) => Promise<Option[]>
//   debounceMs?: number
//   multiple?: boolean
//   required?: boolean
//   textFieldProps?: Partial<TextFieldProps>
// } & Omit<
//   AutocompleteProps<Option, boolean, boolean, false>,
//   'renderInput' | 'options' | 'onChange' | 'value' | 'loading' | 'multiple'
// >

// function CustomAsyncAutoComplete({
//   name,
//   label,
//   fetchOptions,
//   debounceMs = 300,
//   multiple = false,
//   required = false,
//   textFieldProps = {},
//   ...autocompleteProps
// }: CustomAutoCompleteProps) {
//   const { control } = useFormContext()

//   const [options, setOptions] = useState<Option[]>([])
//   const [inputValue, setInputValue] = useState('')
//   const [loading, setLoading] = useState(false)

//   const [debouncedFetch, cancelFetch] = useMemo(
//     () =>
//       delay(async (query: string) => {
//         setLoading(true)
//         try {
//           const results = await fetchOptions(query)
//           setOptions(results)
//         } catch {
//           setOptions([])
//         }
//         setLoading(false)
//       }, debounceMs),
//     [fetchOptions, debounceMs]
//   )

//   useEffect(() => {
//     debouncedFetch(inputValue)
//     return () => {
//       cancelFetch()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cancelFetch])

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, ...field }, fieldState: { error } }) => (
//         <Autocomplete
//           {...field}
//           multiple={multiple}
//           options={options}
//           filterOptions={x => x}
//           onChange={(_, value) => {
//             onChange(value)
//           }}
//           onInputChange={(_, newInputValue) => {
//             setInputValue(newInputValue)
//             debouncedFetch(newInputValue)
//           }}
//           isOptionEqualToValue={(option, val) => option.id === val?.id}
//           loading={loading}
//           renderOption={(props, option) => (
//             <MenuItem {...props} key={option.id} value={option.id}>
//               <ListItemText primary={option.label} secondary={option.secondary} />
//             </MenuItem>
//           )}
//           getOptionLabel={option => option.label}
//           {...autocompleteProps}
//           renderInput={params => (
//             <TextField
//               {...params}
//               {...textFieldProps}
//               label={label}
//               fullWidth
//               margin='dense'
//               error={!!error}
//               helperText={error?.message}
//               required={required}
//               slotProps={{
//                 inputLabel: { shrink: true },
//                 input: {
//                   ...params.InputProps,
//                   endAdornment: (
//                     <>
//                       {loading && <CircularProgress color='inherit' size={20} />}
//                       {params.InputProps.endAdornment}
//                     </>
//                   )
//                 }
//               }}
//             />
//           )}
//         />
//       )}
//     />
//   )
// }

// export default CustomAsyncAutoComplete
