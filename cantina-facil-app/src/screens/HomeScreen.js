// src/screens/HomeScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View, Text, StyleSheet, ActivityIndicator, SectionList,
  Image, TouchableOpacity, ScrollView, Dimensions
} from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [nome, setNome] = useState("");          // "Olá, {nome}"
  const [sections, setSections] = useState([]);  // [{title, data:[ [p,p,p], [p,p,p] ... ]}]
  const [carregando, setCarregando] = useState(true);
  const listRef = useRef(null);

  // 1) pegar nome do usuário
  useEffect(() => {
    (async () => {
      const u = auth.currentUser;
      if (!u) return;
      const snap = await getDoc(doc(db, "usuarios", u.uid));
      const nomeCompleto = snap.exists() ? snap.data().nome || "" : "";
      setNome(nomeCompleto.split(" ")[0] || "");
    })();
  }, []);

  // 2) pegar produtos e montar seções (3 por linha)
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "produtos"));
      const todos = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        .filter(p => p.disponivel);

      // ordem das guias igual ao figma; outras categorias vão depois
      const ordem = ["Lanches", "Salgados", "Diversos", "Bebidas"];
      const porCat = {};
      for (const p of todos) {
        const c = p.categoria || "Outros";
        (porCat[c] ||= []).push(p);
      }
      const categorias = [
        ...ordem.filter(c => porCat[c]),
        ...Object.keys(porCat).filter(c => !ordem.includes(c))
      ];

      const chunk3 = (arr) => {
        const linhas = [];
        for (let i = 0; i < arr.length; i += 3) linhas.push(arr.slice(i, i + 3));
        return linhas;
      };

      const resultado = categorias.map(c => ({
        title: c,
        data: chunk3(porCat[c])
      }));

      setSections(resultado);
      setCarregando(false);
    })();
  }, []);

  const irParaSecao = (categoria) => {
    const idx = sections.findIndex(s => s.title === categoria);
    if (idx >= 0) {
      listRef.current?.scrollToLocation({ sectionIndex: idx, itemIndex: 0, animated: true, viewOffset: 8 });
    }
  };

  if (carregando) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Carregando…</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {/* topo amarelo */}
      <View style={s.header}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.ola}>Olá, {nome || "..." }!</Text>
            <TouchableOpacity style={s.cantinaRow} activeOpacity={0.7}>
              <Text style={s.cantinaNome}>Cantina Prates</Text>
              <Ionicons name="chevron-down" size={16} color="#3a2b00" />
            </TouchableOpacity>
          </View>

          <View style={s.bell}>
            <Ionicons name="notifications-outline" size={22} color="#3a2b00" />
            <View style={s.bellBadge}><Text style={s.bellTxt}>2</Text></View>
          </View>
        </View>

        {/* abas de categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
          {sections.map(sec => (
            <TouchableOpacity key={sec.title} onPress={() => irParaSecao(sec.title)} style={s.tabBtn}>
              <Text style={s.tabTxt}>{sec.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* lista por seções; cada item é uma "linha" com até 3 cards */}
      <SectionList
        ref={listRef}
        sections={sections}
        keyExtractor={(_, i) => String(i)}
        ListHeaderComponent={<View style={{ height: 168 }} />} // altura do topo
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={s.secHeader}>
            <Text style={s.secTitle}>{section.title}</Text>
            <Text style={s.verTudo}>Ver tudo ›</Text>
          </View>
        )}
        renderItem={({ item: linha }) => (
          <View style={s.row}>
            {linha.map(p => (
              <TouchableOpacity
                key={p.id}
                style={s.card}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("DetalheProduto", { produto: p })}
              >
                <Image source={{ uri: p.imagemUrl }} style={s.img} />
                <Text numberOfLines={1} style={s.nome}>{p.nome}</Text>
                <Text style={s.preco}>
                  {Number(p.preco).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
                </Text>
              </TouchableOpacity>
            ))}
            {/* completa a linha se vier menos de 3 itens */}
            {Array.from({ length: 3 - linha.length }).map((_, i) => (
              <View key={`sp-${i}`} style={[s.card, { opacity: 0 }]} />
            ))}
          </View>
        )}
      />
    </View>
  );
}

/* ===== estilos simples ===== */
const W = Dimensions.get("window").width;
const GAP = 12;
const CARD_W = (W - 16*2 - GAP*2) / 3; // 3 colunas

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff"},
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  header: {
    position: "absolute" ,top: 0, left: 0, right: 0, height: 140,
    backgroundColor: "#FFE7A2", paddingTop: 24, paddingHorizontal: 16, zIndex: 10,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ola: { fontSize: 18, fontWeight: "700", color: "#3a2b00" },
  cantinaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2, marginLeft: 122, marginBottom: 14 },
  cantinaNome: { fontWeight: "700", color: "#3a2b00", fontSize:16},
  bell: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center" },
  bellBadge: { position: "absolute", right: -2, top: -6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: "#FF9800", alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  bellTxt: { color: "#fff", fontSize: 11, fontWeight: "700" },

  tabs: { paddingTop: 14, paddingBottom: 8, columnGap: 24 },
  tabBtn: { paddingVertical: 4, paddingHorizontal: 2 },
  tabTxt: { fontSize: 15, fontWeight: "700", color: "#3a2b00" },

  secHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 18, marginBottom: 8 },
  secTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  verTudo: { color: "#5A5A5A", fontWeight: "700" },

  row: { flexDirection: "row", columnGap: GAP, marginBottom: GAP },

  card: {
    width: CARD_W, backgroundColor: "#fff", borderRadius: 12, padding: 8,
    elevation: 2, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
  },
  img: { width: "100%", height: 92, borderRadius: 10, backgroundColor: "#f0f0f0", marginBottom: 6 },
  nome: { fontSize: 12.5, fontWeight: "700", color: "#222" },
  preco: { marginTop: 2, fontSize: 12, fontWeight: "700", color: "#111" },
});
