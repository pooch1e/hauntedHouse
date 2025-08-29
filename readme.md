# Three.js Journey Haunted House from https://threejs-journey.com/lessons/haunted-house#

## Setup
Run this followed commands:

``` bash
# Install dependencies (only the first time)
pnpm install

# Run the local server at localhost:8080
pnpm run dev

# Build for production in the dist/ directory
pnpm run build
```

# 🏚️ Haunted House - Three.js Scene

Live Link:
https://haunted-house-eta-bice.vercel.app/


A spooky 3D haunted house scene built with Three.js, featuring atmospheric lighting, animated ghost lights, and detailed textures.

## ✨ Features

- **Realistic Materials**: PBR (Physically Based Rendering) materials with detailed textures for walls, roof, floor, and door
- **Dynamic Lighting**: Multiple light sources including ambient, directional, and animated point lights
- **Atmospheric Effects**: Fog and sky system for enhanced mood
- **Animated Elements**: Floating ghost lights that move in circular patterns
- **Shadow System**: Real-time shadows from multiple light sources
- **Interactive Camera**: OrbitControls for exploring the scene
- **Procedural Graves**: Randomly positioned and rotated gravestones around the house

## 🛠️ Technical Implementation

### Core Technologies
- **Three.js** - 3D graphics library
- **WebGL** - Hardware-accelerated rendering
- **JavaScript ES6+** - Modern JavaScript features

### Key Components
- Textured floor plane with displacement mapping
- Modular house structure (walls, roof, door, bushes)
- Procedurally generated graveyard
- Multi-light shadow system
- Atmospheric sky and fog effects

### Performance Optimizations
- Efficient shadow map sizing
- Texture repeat wrapping to reduce memory usage
- Responsive pixel ratio handling
- Smooth 60fps animation loop

## 🎮 Controls

- **Mouse**: Click and drag to orbit around the scene
- **Scroll**: Zoom in/out
- **GUI Panel**: Adjust floor displacement properties

## 🏗️ Project Structure

```
haunted-house/
├── assets/
│   ├── wall/           # Castle brick textures
│   ├── roof/           # Slate roof textures  
│   ├── bush/           # Leaf textures
│   ├── grave/          # Stone textures
│   └── door/           # Door textures & maps
├── floor/              # Ground textures
└── script.js           # Main application
```

## 🎨 Visual Design

The scene creates a haunting atmosphere through:
- Warm orange door light contrasting with cool ambient lighting
- Ethereal ghost lights in soft pastels (cream, green, blue)
- Realistic PBR materials with proper roughness and metalness
- Atmospheric fog that obscures distant objects
- Dynamic shadows that enhance depth and realism

## 📚 Learning Journey

This project was created as part of learning advanced Three.js concepts, inspired by Bruno Simon's **Three.js Journey** course. It demonstrates practical application of:

- Complex material workflows with multiple texture maps
- Advanced lighting and shadow techniques  
- Scene composition and atmospheric effects
- Performance optimization strategies
- Interactive 3D experiences

## 🚀 Live Demo



## 🙏 Credits

- **Three.js Journey** by Bruno Simon - Excellent course that provided the foundation for this project
- **Three.js Community** - For the amazing 3D graphics library
- **Texture Sources** - Various PBR texture libraries for realistic materials

---

*Part of my 3D graphics portfolio showcasing Three.js skills and creative scene composition.*
