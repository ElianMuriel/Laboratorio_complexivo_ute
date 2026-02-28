import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from "react-native";

import { listLabOrderEventsApi } from "../api/lab-order-events.api";
import type { LabOrderEvent } from "../types/labOrderEvent";

export default function EventosScreen() {
  const [items, setItems] = useState<LabOrderEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const load = async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMessage("");
      const data = await listLabOrderEventsApi();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setErrorMessage("No se pudo cargar eventos. Revisa la conexión con la API.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de Órdenes (Mongo)</Text>
      {loading && <ActivityIndicator size="large" color="#58a6ff" style={styles.loader} />}
      {!loading && !!errorMessage && (
        <>
          <Text style={styles.error}>{errorMessage}</Text>
          <Pressable onPress={load} style={[styles.btn, { marginBottom: 12 }]}>
            <Text style={styles.btnText}>Reintentar</Text>
          </Pressable>
        </>
      )}
      {!loading && !errorMessage && (
        <>
          <Pressable onPress={load} style={[styles.btn, { marginBottom: 12 }]}>
            <Text style={styles.btnText}>Refrescar</Text>
          </Pressable>
          {items.length === 0 ? (
            <Text style={styles.empty}>No hay eventos. Crea órdenes para generar eventos.</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowText}>Orden #{item.lab_order_id} · {item.event_type}</Text>
                    <Text style={styles.rowSub}>Origen: {item.source}{item.note ? ` · ${item.note}` : ""}</Text>
                    <Text style={styles.rowSub}>{item.created_at}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1117", padding: 16 },
  title: { color: "#58a6ff", fontSize: 22, fontWeight: "800", marginBottom: 10 },
  loader: { marginVertical: 20 },
  error: { color: "#ff7b72", marginBottom: 10 },
  btn: { backgroundColor: "#21262d", borderColor: "#58a6ff", borderWidth: 1, padding: 12, borderRadius: 8 },
  btnText: { color: "#58a6ff", textAlign: "center", fontWeight: "700" },
  empty: { color: "#8b949e", marginTop: 16, textAlign: "center" },
  row: {
    backgroundColor: "#161b22",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  rowText: { color: "#c9d1d9", fontWeight: "800" },
  rowSub: { color: "#8b949e", marginTop: 2 },
});
