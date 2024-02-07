import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const useGet = (url, axios) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setState(data.data || data);
      setLoading(false);
    } catch (error) {
      // toast.error("Error en la conexión");
      <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={handleClose}
        severity={error}
        variant="filled"
        sx={{ width: "100%" }}
      >
        Error en la conexión
      </Alert>
    </Snackbar>
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [state, loading, getData, setState];
};

export default useGet;
