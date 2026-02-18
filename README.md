# ⧖ TimeTravel Agency — Webapp Interactive

> Agence de voyage temporel de luxe | Projet pédagogique Ynov Campus M1

**Membres du groupe :** Hamza DJOUDI · Thibault FOUCHET · Lucas DEBRUILLE · [Membre 4]

---

## 🌐 Demo Live

**[→ timetravel-agency-pearl.vercel.app](https://timetravel-agency-pearl.vercel.app)**

---

## 🛠️ Stack Technique

| Technologie | Usage |
|---|---|
| HTML5 sémantique | Structure |
| CSS3 (Vanilla) | Design system, animations, glassmorphism |
| JavaScript ES6+ | Logique, quiz, chatbot |
| AOS.js | Animations au scroll |
| OpenRouter API | Chatbot conversationnel IA |
| Vercel | Hébergement & déploiement |
| Google Fonts | Playfair Display + Inter |

---

## ✨ Features Implémentées

### Phase 1 — Architecture
- [x] Définition des features (toutes les essentielles)
- [x] Structure de navigation complète

### Phase 2 — Vibe Coding
- [x] **Hero section** avec animation de particules (étoiles générées dynamiquement)
- [x] **Présentation de l'agence** avec horloge animée CSS
- [x] **Galerie des 3 destinations** : Paris 1889, Crétacé -65M, Florence 1504
  - Cards interactives avec hover effects
  - Images, prix, highlights par destination
- [x] **Formulaire de réservation** avec validation et feedback
- [x] Animations AOS au scroll sur toutes les sections
- [x] Navbar sticky avec effet glassmorphism au scroll
- [x] Design responsive (mobile-first)

### Phase 3 — Intelligence Artificielle
- [x] **Chatbot IA "ZGEG"** (Exercice 3.1)
  - Widget flottant en bas à droite
  - Intégration OpenRouter API
  - Fallback local intelligent (réponses prédéfinies)
  - Historique de conversation avec contexte
  - Suggestions rapides prédéfinies
  - Personnalité définie : conseiller en voyages temporels
- [x] **Quiz de recommandation** (Exercice 3.2 — Optionnel)
  - 4 questions avec scoring pondéré
  - Algorithme de recommandation (Paris / Crétacé / Florence)
  - Pré-sélection automatique dans le formulaire de réservation

### Phase 4 — Open Source & Déploiement
- [x] README.md complet
- [x] Déploiement Vercel

---

## 🤖 IA Utilisées

| Outil | Usage |
|---|---|
| **OpenRouter API** | Chatbot conversationnel ZGEG |
| **Unsplash** | Images des destinations (libres de droits) |

---

## 🚀 Installation Locale

```bash
# Cloner le repo
git clone https://github.com/HAAMZA7/timetravel-agency.git
cd timetravel-agency

# Ouvrir directement (pas de build requis)
open index.html
# ou
python -m http.server 8080
```

---

## 📁 Structure du Projet

```
timetravel-agency/
├── index.html          # Page principale (toutes sections)
├── style.css           # Design system complet (dark mode + gold)
├── app.js              # Logique JS (stars, quiz, chatbot, form)
└── README.md           # Documentation
```

---

## 📄 Licence

Projet pédagogique — Ynov Campus M1 Cyber — 2025/2026
