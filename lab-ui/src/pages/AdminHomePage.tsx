import { Container, Paper, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminHomePage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Panel de Administrador</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" component={Link} to="/admin/pruebas">CRUD para Pruebas</Button>
          <Button variant="contained" component={Link} to="/admin/ordenes">CRUD para Ordenes</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
