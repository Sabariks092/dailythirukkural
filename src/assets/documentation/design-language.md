# Daily Thirukkural - Design Language v1.0

A professional, culturally sensitive design system tailored for the modern presentation of Tamil literature.

---

## 🎨 Color System

The palette is inspired by the **"Temple & Textile"** heritage of Tamil Nadu—utilizing earthy marigolds, deep madder reds, and serene temple stones.

### Brand Colors
| Token | Role | HEX | RGB | HSL |
| :--- | :--- | :--- | :--- | :--- |
| `primary-500` | Signature Marigold | `#D97706` | `217, 119, 6` | `32, 95%, 44%` |
| `primary-600` | Deep Ochre (Hover) | `#B45309` | `180, 83, 9` | `26, 90%, 37%` |
| `secondary-500` | Madder Red (Accents) | `#991B1B` | `153, 27, 27` | `0, 70%, 35%` |
| `accent-500` | Peacock Teal (Callouts) | `#0D9488` | `13, 148, 136` | `175, 84%, 32%` |

### Neutrals (Light Mode)
| Token | HEX | Usage |
| :--- | :--- | :--- |
| `bg-main` | `#FFFCF5` | Ivory Page Background (Mental Calm) |
| `bg-surface` | `#FFFFFF` | Card & Paper Background |
| `text-primary` | `#1F2937` | Main Content |
| `text-secondary`| `#4B5563` | Metaphysical / Metadata |
| `border-soft` | `#E5E7EB` | Hairline dividers |

### Neutrals (Dark Mode)
| Token | HEX | Usage |
| :--- | :--- | :--- |
| `bg-main` | `#0F172A` | Midnight Slate |
| `bg-surface` | `#1E293B` | Raised Surfaces |
| `text-primary` | `#F8FAFC` | High Contrast Text |
| `text-secondary`| `#94A3B8` | Subtle Metadata |

> [!TIP]
> **Total Palette**: 52 defined tokens across 6 scales (Primary, Secondary, Accent, Success, Warning, Neutral). Use HSL for dynamic state calculations.

---

## 🔤 Typography

The typography system prioritizes the vertical flow and rounded glyphs of the Tamil script.

### Modern Tamil Font: **Anek Tamil**
- **Rationale**: Anek Tamil offers exceptional legibility in smaller sizes and a strikingly modern aesthetic for headlines.
- **English Pairing**: **Inter** (Clean, neutral sans-serif).

### Typography Scale (Fluid)
| Level | Size (px) | Line Height | Letter Spacing | weight |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 48px | 1.1 | -0.02em | 700 (Bold) |
| **Headline H1**| 36px | 1.2 | -0.01em | 600 (Semi) |
| **Headline H2**| 30px | 1.3 | 0 | 600 (Semi) |
| **Body Large** | 20px | 1.6 | 0.01em | 400 (Reg) |
| **Body Normal**| 16px | 1.6 | 0.01em | 400 (Reg) |
| **Caption** | 12px | 1.4 | 0.02em | 500 (Medium) |

> [!IMPORTANT]
> **Line Height Rule**: Tamil glyphs require ~1.6 height for body text to prevent "clashing" of top/bottom modifiers.

---

## 📐 Spacing & Layout

Based on the **8pt Grid System** for pixel-perfect alignment.

- **Base Unit**: `4px`
- **Spacing Scale**:
  - `xs`: 4px
  - `sm`: 8px
  - `md`: 16px
  - `lg`: 24px
  - `xl`: 32px
  - `2xl`: 48px
  - `3xl`: 64px

### Layout Containers
- **Max Width**: `1200px`
- **Gutter**: `24px` (Mobile: `16px`)
- **Border Radius**:
  - `Button`: 8px (Small)
  - `Card`: 16px (Medium)
  - `Overlay`: 24px (Large)

---

## 🎯 Components

### 1. Daily Kural Card
- **Background**: `bg-surface` with a subtle `2px` border in `primary-500`.
- **Inner Padding**: `32px`.
- **Text Alignment**: Center-aligned traditional couplet.
- **Visual Motif**: A faint, watermark-style **Lotus** or **Palm Leaf** pattern at 5% opacity.

### 2. Audio Player Integration
- **Style**: Minimal "pill" design.
- **Interaction**: Waveform animation in `accent-500` during playback.
- **Controls**: Large touch targets (44x44px min).

### 3. Share & Interaction
- **Primary Action**: WhatsApp (Brand Green `#25D366`).
- **Secondary Actions**: Twitter, Copy Link (Ghost buttons with `primary-500` icons).
- **Feedback**: Immediate toast notification on "Copy Link".

---

## 📱 Responsive Design

| Breakpoint | Width | Behavior |
| :--- | :--- | :--- |
| **Mobile** | < 640px | Single column, maximized typography |
| **Tablet** | 640px - 1024px| Centered layouts, 24px gutters |
| **Desktop** | > 1024px | Multi-column dashboard for Analytics |

---

## ♿ Accessibility & Cultural Sensitivity

1. **Whitespace as Discipline**: Use generous `3xl` spacing between the Daily Kural and secondary interactions to allow for reflection.
2. **Contrast**: All text-on-background combinations must pass **WCAG AA** (4.5:1 ratio).
3. **Motifs**: Avoid cluttered graphics. Use subtle **Kolam** patterns (simplified geometric line art) for divider elements.
4. **Reading Experience**: The "Read More" page should use a "Focus Mode" that hides the Sidebar and Navbar during scroll.

---

## 🛠 Developer Handoff

```javascript
// Tailored CSS Variables
:root {
  --color-primary: #D97706;
  --font-tamil: 'Anek Tamil', sans-serif;
  --font-english: 'Inter', sans-serif;
  --radius-card: 16px;
  --shadow-warm: 0 4px 6px -1px rgba(217, 119, 6, 0.1);
}
```

*Generated for Daily Thirukkural Web Application v1.0*
