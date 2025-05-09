import './App.css'
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import {
  Avatar,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
  })
  .required()

function App() {

  return (
    <>
      <MyForm />
    </>
  )
}

export default App


function MyForm() {
  const { control, handleSubmit, formState: { errors }, } = useForm(
    {
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        Gender: "",
      },
      resolver: yupResolver(schema),
    }
  );

  const [imagePreview, setImagePreview] = useState(null);
  //const [imageFile, setImageFile] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box component="section" sx={{ marginRight: 30, marginLeft: 30, marginTop: 10, p: 2, border: '1px dashed grey' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>React Hook Form with Material UI</h1>
        <hr />
        <Box sx={{ marginBottom: 5 }}></Box>

        <Controller
          name="name"
          control={control}
          render={({ field }) =>
            <TextField
              {...field}
              id="name"
              label="Name"
              variant="outlined" />
          }
        />
        <p style={{ color: "red" }}>{errors.name?.message}</p>

        <Controller
          name="email"
          control={control}
          render={({ field }) =>
            <TextField
              {...field}
              id="email"
              label="Email"
              variant="outlined" />
          }
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <Controller
          name="phone"
          control={control}
          render={({ field }) =>
            <TextField
              {...field}
              id="phone"
              label="Phone"
              variant="outlined" />
          }
        />

        <Controller
          name="Gender"
          control={control}
          render={({ field }) =>
            <RadioGroup {...field} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          }
        />

        <Controller
          name="image"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
                field.onChange(e.target.files[0])
              }}
            />
          )}
        />

        {/* Preview */}
        {imagePreview && (
          <Box mt={2}>
            <Typography variant="body2">Image Preview:</Typography>
            <Avatar
              src={imagePreview}
              alt="Image Preview"
              sx={{ width: 80, height: 80 }}
            />
          </Box>
        )}
        
        <Box sx={{ width: 100, margin: 'auto', paddingTop: 2 }}>
          <Button variant="outlined" type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
}



