import { Container, Paper, Typography, Stack } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";

export default function HomePage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <ScienceIcon />
          <Typography variant="h5">Laboratorio Muriel Complexivo — Gestión de Órdenes</Typography>
        </Stack>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Consultar el estado de órdenes o acceder al panel admin para crear, eliminar o editar pruebas ú órdenes.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Flujo: Órdenes (estado) → Login → Admin → CRUD Pruebas / Órdenes.
        </Typography>
      </Paper>
    </Container>
  );
}
