# GLB optimization report

Updated whenever a source model is added or changed.

- Models analyzed: 49
- Source size: 90.46 MB
- Optimized output size: 57.11 MB
- Total reduction: 33.35 MB (36.9%)
- Only non-car environment GLBs are included; car models and car outputs are untouched.
- Environment geometry targets 85% of source vertex detail with a 0.002 normalized error bound, then uses high-quality Meshopt compression.
- Base-color and emissive textures use quality-90 WebP, capped at 2048px; normal, roughness, and metallic maps are left unchanged.
- Original files are not modified. Optimized copies are written to `public/models-optimized/`.

| Model | Source | Output | Saved | Result |
|---|---:|---:|---:|---|
| env/banner_tower.glb | 0.01 MB | 0.01 MB | 0.00 MB | 2.0% smaller |
| env/barrier_red.glb | 0.00 MB | 0.00 MB | 0.00 MB | No smaller output |
| env/barrier_white.glb | 0.00 MB | 0.00 MB | 0.00 MB | No smaller output |
| env/billboard.glb | 0.01 MB | 0.01 MB | 0.00 MB | 4.0% smaller |
| env/building_a.glb | 0.03 MB | 0.03 MB | 0.01 MB | 17.6% smaller |
| env/cactus_short.glb | 0.00 MB | 0.00 MB | 0.00 MB | 0.1% smaller |
| env/cactus_tall.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/canyon_cliff.glb | 0.00 MB | 0.00 MB | 0.00 MB | No smaller output |
| env/canyon_rock.glb | 0.01 MB | 0.01 MB | 0.00 MB | 0.1% smaller |
| env/canyon_tall.glb | 0.01 MB | 0.01 MB | 0.00 MB | 0.1% smaller |
| env/flag_checkers.glb | 0.01 MB | 0.01 MB | 0.00 MB | 1.8% smaller |
| env/grandstand_covered.glb | 0.01 MB | 0.01 MB | 0.00 MB | 0.1% smaller |
| env/light_post.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/Marine/buildings/low_poly_skyscraper.glb | 0.25 MB | 0.10 MB | 0.15 MB | 59.3% smaller |
| env/Marine/buildings/simple_skyscraper.glb | 7.17 MB | 6.51 MB | 0.66 MB | 9.2% smaller |
| env/Marine/buildings/skyscraper 2.glb | 0.37 MB | 0.34 MB | 0.03 MB | 8.4% smaller |
| env/Marine/buildings/skyscraper.glb | 6.83 MB | 4.06 MB | 2.77 MB | 40.6% smaller |
| env/Marine/buildings/skyscraper_tower.glb | 1.19 MB | 1.15 MB | 0.04 MB | 3.3% smaller |
| env/overhead_lights.glb | 0.01 MB | 0.01 MB | 0.00 MB | 0.3% smaller |
| env/pine_round.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/pine_tall_a.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/pine_tall_b.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/pits_garage.glb | 0.01 MB | 0.01 MB | 0.00 MB | 2.4% smaller |
| env/pits_office.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/pylon.glb | 0.00 MB | 0.00 MB | 0.00 MB | No smaller output |
| env/race_drag_start_and_finish_line.glb | 0.05 MB | 0.03 MB | 0.03 MB | 50.6% smaller |
| env/rocks/40_rocks.glb | 0.62 MB | 0.33 MB | 0.29 MB | 47.0% smaller |
| env/rocks/blocky_rocks.glb | 3.84 MB | 3.83 MB | 0.01 MB | 0.2% smaller |
| env/rocks/rocks_photogrammetry_scan.glb | 2.54 MB | 1.89 MB | 0.65 MB | 25.5% smaller |
| env/rocks/stylized_rocks.glb | 1.68 MB | 1.03 MB | 0.66 MB | 39.0% smaller |
| env/rock_large.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/sakura pass/2ff77d68adf6448a936fa1b1575133cb.glb | 0.63 MB | 0.26 MB | 0.36 MB | 57.8% smaller |
| env/sakura pass/cherry_blossom_trees.glb | 8.23 MB | 6.05 MB | 2.18 MB | 26.5% smaller |
| env/sakura pass/chinese_architecture.glb | 0.58 MB | 0.16 MB | 0.43 MB | 73.1% smaller |
| env/sakura pass/chinese_fantasy_03_-_revisited.glb | 7.22 MB | 2.60 MB | 4.62 MB | 64.0% smaller |
| env/sakura pass/chinese_hall.glb | 7.36 MB | 4.71 MB | 2.65 MB | 36.0% smaller |
| env/sakura pass/japanese_lowpoly_temple.glb | 12.60 MB | 6.50 MB | 6.10 MB | 48.4% smaller |
| env/sakura pass/japanese_wooden_lamp_pagoda.glb | 4.23 MB | 3.73 MB | 0.49 MB | 11.7% smaller |
| env/sakura pass/maybe_jp_drum.glb | 4.05 MB | 2.99 MB | 1.06 MB | 26.1% smaller |
| env/skyscraper_a.glb | 0.03 MB | 0.03 MB | 0.01 MB | 18.1% smaller |
| env/skyscraper_b.glb | 0.03 MB | 0.03 MB | 0.01 MB | 15.9% smaller |
| env/skyscraper_c.glb | 0.04 MB | 0.03 MB | 0.01 MB | 15.0% smaller |
| env/tent.glb | 0.01 MB | 0.01 MB | 0.00 MB | No smaller output |
| env/trees/dry_realistic_grass_lods_1.glb | 0.09 MB | 0.07 MB | 0.02 MB | 18.2% smaller |
| env/trees/dry_tree_vurvur_house_5.glb | 3.19 MB | 2.08 MB | 1.11 MB | 34.8% smaller |
| env/trees/palm_tree_tall.glb | 1.37 MB | 0.75 MB | 0.62 MB | 45.4% smaller |
| env/trees/spruce_trees.glb | 2.66 MB | 1.32 MB | 1.34 MB | 50.2% smaller |
| env/trees/tree.glb | 13.32 MB | 6.28 MB | 7.04 MB | 52.8% smaller |
| env/trees/tree_low_poly_lowpoly.glb | 0.10 MB | 0.07 MB | 0.04 MB | 37.6% smaller |

## env/banner_tower.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "bannerTowerRed(Clone)",
        "bboxMin": [
          -0.35001,
          -0.01,
          -1.03521
        ],
        "bboxMax": [
          0.03521,
          1.23566,
          -0.64999
        ],
        "renderVertexCount": 1278,
        "uploadVertexCount": 831,
        "uploadNaiveVertexCount": 831
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh bannerTowerRed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 426,
        "vertices": 831,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 16683
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "bannerTowerRed(Clone)",
        "bboxMin": [
          -0.35001,
          -0.01,
          -1.03521
        ],
        "bboxMax": [
          0.03521,
          1.23566,
          -0.64999
        ],
        "renderVertexCount": 1188,
        "uploadVertexCount": 801,
        "uploadNaiveVertexCount": 801
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh bannerTowerRed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 396,
        "vertices": 801,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 15993
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/barrier_red.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "barrierRed(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.773
        ],
        "bboxMax": [
          -0.1,
          0.1212,
          -0.65
        ],
        "renderVertexCount": 84,
        "uploadVertexCount": 48,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 984
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "barrierRed(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.773
        ],
        "bboxMax": [
          -0.1,
          0.1212,
          -0.65
        ],
        "renderVertexCount": 84,
        "uploadVertexCount": 48,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 984
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/barrier_white.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "barrierWhite(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.773
        ],
        "bboxMax": [
          -0.1,
          0.1212,
          -0.65
        ],
        "renderVertexCount": 84,
        "uploadVertexCount": 48,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh barrierWhite",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 984
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "barrierWhite(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.773
        ],
        "bboxMax": [
          -0.1,
          0.1212,
          -0.65
        ],
        "renderVertexCount": 84,
        "uploadVertexCount": 48,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh barrierWhite",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 984
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/billboard.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "billboard(Clone)",
        "bboxMin": [
          -0.4138,
          -0.01,
          -1.08621
        ],
        "bboxMax": [
          0.5862,
          0.99,
          -0.60999
        ],
        "renderVertexCount": 408,
        "uploadVertexCount": 184,
        "uploadNaiveVertexCount": 184
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh billboard",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 136,
        "vertices": 184,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3944
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "bark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "tankco",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "tankcoBanner",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x128",
        "size": 3963,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "billboard(Clone)",
        "bboxMin": [
          -0.4138,
          -0.01,
          -1.08621
        ],
        "bboxMax": [
          0.5862,
          0.99,
          -0.60999
        ],
        "renderVertexCount": 372,
        "uploadVertexCount": 172,
        "uploadNaiveVertexCount": 172
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh billboard",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 124,
        "vertices": 172,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3668
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "bark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "tankco",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "tankcoBanner",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x128",
        "size": 3580,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/building_a.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-a",
        "rootName": "building-a",
        "bboxMin": [
          -0.4418,
          0,
          -0.46999
        ],
        "bboxMax": [
          0.4418,
          1.293,
          0.46999
        ],
        "renderVertexCount": 3756,
        "uploadVertexCount": 2074,
        "uploadNaiveVertexCount": 2074
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-a",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1252,
        "vertices": 2074,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 42770
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 11002,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-a",
        "rootName": "building-a",
        "bboxMin": [
          -0.4418,
          0,
          -0.46999
        ],
        "bboxMax": [
          0.4418,
          1.293,
          0.46999
        ],
        "renderVertexCount": 3756,
        "uploadVertexCount": 2074,
        "uploadNaiveVertexCount": 2074
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-a",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1252,
        "vertices": 2074,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 42770
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 5112,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/cactus_short.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cactus_short",
        "bboxMin": [
          -0.16833,
          -0.05,
          -0.11735
        ],
        "bboxMax": [
          0.17333,
          0.483,
          0.17984
        ],
        "renderVertexCount": 348,
        "uploadVertexCount": 186,
        "uploadNaiveVertexCount": 186
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cactus_short",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 116,
        "vertices": 186,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3858
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsGreen",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cactus_short",
        "bboxMin": [
          -0.16833,
          -0.05,
          -0.11735
        ],
        "bboxMax": [
          0.17333,
          0.483,
          0.17984
        ],
        "renderVertexCount": 348,
        "uploadVertexCount": 186,
        "uploadNaiveVertexCount": 186
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cactus_short",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 116,
        "vertices": 186,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3858
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsGreen",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/cactus_tall.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cactus_tall",
        "bboxMin": [
          -0.19946,
          -0.05,
          -0.13248
        ],
        "bboxMax": [
          0.19679,
          0.7,
          0.2066
        ],
        "renderVertexCount": 366,
        "uploadVertexCount": 210,
        "uploadNaiveVertexCount": 210
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cactus_tall",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 122,
        "vertices": 210,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 4302
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsGreen",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cactus_tall",
        "bboxMin": [
          -0.19946,
          -0.05,
          -0.13248
        ],
        "bboxMax": [
          0.19679,
          0.7,
          0.2066
        ],
        "renderVertexCount": 366,
        "uploadVertexCount": 210,
        "uploadNaiveVertexCount": 210
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cactus_tall",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 122,
        "vertices": 210,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 4302
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsGreen",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/canyon_cliff.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cliff_block_rock",
        "bboxMin": [
          -0.5,
          -0.05,
          -0.5
        ],
        "bboxMax": [
          0.5,
          0.95,
          0.5
        ],
        "renderVertexCount": 36,
        "uploadVertexCount": 24,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cliff_block_rock",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u32"
        ],
        "attributes": [
          "NORMAL:f32",
          "POSITION:f32",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 912
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "cliff_block_rock",
        "bboxMin": [
          -0.5,
          -0.05,
          -0.5
        ],
        "bboxMax": [
          0.5,
          0.95,
          0.5
        ],
        "renderVertexCount": 36,
        "uploadVertexCount": 24,
        "uploadNaiveVertexCount": 48
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh cliff_block_rock",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u32"
        ],
        "attributes": [
          "NORMAL:f32",
          "POSITION:f32",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 912
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/canyon_rock.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_largeD",
        "bboxMin": [
          -0.53439,
          -0.05,
          -0.51514
        ],
        "bboxMax": [
          0.53439,
          0.51826,
          0.51514
        ],
        "renderVertexCount": 240,
        "uploadVertexCount": 147,
        "uploadNaiveVertexCount": 147
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_largeD",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 80,
        "vertices": 147,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2979
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_largeD",
        "bboxMin": [
          -0.53439,
          -0.05,
          -0.51514
        ],
        "bboxMax": [
          0.53439,
          0.51826,
          0.51514
        ],
        "renderVertexCount": 240,
        "uploadVertexCount": 147,
        "uploadNaiveVertexCount": 147
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_largeD",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 80,
        "vertices": 147,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2979
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/canyon_tall.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_tallA",
        "bboxMin": [
          -0.49153,
          -0.05,
          -0.3416
        ],
        "bboxMax": [
          0.49153,
          0.94593,
          0.3416
        ],
        "renderVertexCount": 408,
        "uploadVertexCount": 254,
        "uploadNaiveVertexCount": 254
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_tallA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 136,
        "vertices": 254,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5134
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_tallA",
        "bboxMin": [
          -0.49153,
          -0.05,
          -0.3416
        ],
        "bboxMax": [
          0.49153,
          0.94593,
          0.3416
        ],
        "renderVertexCount": 405,
        "uploadVertexCount": 253,
        "uploadNaiveVertexCount": 253
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_tallA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 135,
        "vertices": 253,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5111
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/flag_checkers.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "flagCheckers(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.6852
        ],
        "bboxMax": [
          -0.1528,
          1.24,
          -0.65
        ],
        "renderVertexCount": 552,
        "uploadVertexCount": 276,
        "uploadNaiveVertexCount": 276
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh flagCheckers",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 100,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2276
      },
      {
        "name": "Mesh Group 391",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 88,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3520
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "checkers",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "checkers",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "128x128",
        "size": 437,
        "gpuSize": 87380
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "flagCheckers(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -0.6852
        ],
        "bboxMax": [
          -0.1528,
          1.24,
          -0.65
        ],
        "renderVertexCount": 504,
        "uploadVertexCount": 260,
        "uploadNaiveVertexCount": 260
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh flagCheckers",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 84,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1908
      },
      {
        "name": "Mesh Group 391",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 88,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3520
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "checkers",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "checkers",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "128x128",
        "size": 342,
        "gpuSize": 87380
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/grandstand_covered.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "grandStandCovered(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.64999
        ],
        "bboxMax": [
          0.65,
          1.17639,
          -0.63001
        ],
        "renderVertexCount": 504,
        "uploadVertexCount": 320,
        "uploadNaiveVertexCount": 320
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh grandStandCovered",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 5,
        "glPrimitives": 168,
        "vertices": 320,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 6448
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "grandStandCovered(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.64999
        ],
        "bboxMax": [
          0.65,
          1.17639,
          -0.63001
        ],
        "renderVertexCount": 501,
        "uploadVertexCount": 319,
        "uploadNaiveVertexCount": 319
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh grandStandCovered",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 5,
        "glPrimitives": 167,
        "vertices": 319,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 6425
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/light_post.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "lightPostLarge(Clone)",
        "bboxMin": [
          -0.54,
          -0.01,
          -0.6676
        ],
        "bboxMax": [
          -0.16,
          0.78566,
          -0.57054
        ],
        "renderVertexCount": 1020,
        "uploadVertexCount": 552,
        "uploadNaiveVertexCount": 552
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh lightPostLarge",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 340,
        "vertices": 552,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 11424
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "pylon",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "lightPostLarge(Clone)",
        "bboxMin": [
          -0.54,
          -0.01,
          -0.6676
        ],
        "bboxMax": [
          -0.16,
          0.78566,
          -0.57054
        ],
        "renderVertexCount": 1020,
        "uploadVertexCount": 552,
        "uploadNaiveVertexCount": 552
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh lightPostLarge",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 340,
        "vertices": 552,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 11424
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "pylon",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/Marine/buildings/low_poly_skyscraper.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          3.24792,
          0,
          -183.31459
        ],
        "bboxMax": [
          180.06458,
          335.37575,
          -1.3125
        ],
        "renderVertexCount": 4529,
        "uploadVertexCount": 1041,
        "uploadNaiveVertexCount": 1041
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5,
        "vertices": 9,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 111
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 780,
        "vertices": 551,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 9639
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 18,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 516
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4,
        "vertices": 8,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 160
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 700,
        "vertices": 443,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 8187
      },
      {
        "name": "Material2",
        "mode": [
          "LINES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1,
        "vertices": 2,
        "indices": [
          "u16"
        ],
        "attributes": [
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 16
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "LightGray",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "whitebuildingfront_1",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "buildingfrontdoor",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "acfront",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "Color_007",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "edge_color000255",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "256x512",
        "size": 98214,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "512x256",
        "size": 53933,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "512x512",
        "size": 87428,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          3.24792,
          -90.03334,
          -183.31342
        ],
        "bboxMax": [
          180.06458,
          335.37575,
          -1.3125
        ],
        "renderVertexCount": 3854,
        "uploadVertexCount": 925,
        "uploadNaiveVertexCount": 925
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4,
        "vertices": 6,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 78
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 662,
        "vertices": 492,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 8400
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 18,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 516
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4,
        "vertices": 8,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 160
      },
      {
        "name": "Material2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 594,
        "vertices": 389,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 7065
      },
      {
        "name": "Material2",
        "mode": [
          "LINES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1,
        "vertices": 2,
        "indices": [
          "u16"
        ],
        "attributes": [
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 16
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "LightGray",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "whitebuildingfront_1",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "buildingfrontdoor",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "acfront",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "Color_007",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "edge_color000255",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x512",
        "size": 31356,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x256",
        "size": 16490,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 38536,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/Marine/buildings/simple_skyscraper.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.14881,
          -0.5,
          -0.14881
        ],
        "bboxMax": [
          0.14881,
          0.5,
          0.14881
        ],
        "renderVertexCount": 571653,
        "uploadVertexCount": 128941,
        "uploadNaiveVertexCount": 128941
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 180,
        "vertices": 360,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 7200
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2880,
        "vertices": 3422,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 75454
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10553,
        "vertices": 13333,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 289979
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16920,
        "vertices": 24840,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 523800
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 118482,
        "vertices": 65532,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 1824936
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 41536,
        "vertices": 21454,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 613934
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_1",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_3",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_4",
        "instances": 2,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 223159,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1120048,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 249782,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 50337,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1165524,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 56018,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 294629,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1243780,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 272398,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 118502,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1001190,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 147312,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 245294,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 455335,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 137121,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.14881,
          -0.5,
          -0.14881
        ],
        "bboxMax": [
          0.14881,
          0.5,
          0.14881
        ],
        "renderVertexCount": 485976,
        "uploadVertexCount": 112215,
        "uploadNaiveVertexCount": 112215
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 180,
        "vertices": 360,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 7200
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2448,
        "vertices": 2990,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 65518
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8969,
        "vertices": 12049,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 258647
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 14382,
        "vertices": 22302,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 465426
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 100708,
        "vertices": 56324,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 1561756
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 35305,
        "vertices": 18190,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 521060
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_1",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_3",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_4",
        "instances": 2,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 58442,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1120048,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 249782,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 6490,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1165524,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 56018,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 110192,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1243780,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 272398,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 16388,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1001190,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 147312,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 74898,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 455335,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 137121,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/Marine/buildings/skyscraper 2.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -293585.625,
          -21980.18085,
          -228889.75517
        ],
        "bboxMax": [
          277933.75,
          66979.89063,
          276071.25517
        ],
        "renderVertexCount": 111066,
        "uploadVertexCount": 51810,
        "uploadNaiveVertexCount": 58458
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 512,
        "vertices": 1024,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 12288
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3665,
        "vertices": 5835,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 74505
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 128,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 144,
        "vertices": 288,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4608
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 86,
        "vertices": 112,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1972
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 728,
        "vertices": 1456,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 17472
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 60,
        "vertices": 120,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1440
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 288
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 168,
        "vertices": 288,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 3600
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4050,
        "vertices": 6772,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 85248
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5616,
        "vertices": 9406,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 118350
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2994,
        "vertices": 4890,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 61974
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2856,
        "vertices": 3726,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 80478
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 40,
        "vertices": 52,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 708
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 92,
        "vertices": 104,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1488
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6056,
        "vertices": 8938,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 116778
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6203,
        "vertices": 7959,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 108849
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 21,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_1",
        "instances": 6,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_2",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_3",
        "instances": 3,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_4",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_5",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_6",
        "instances": 15,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_7",
        "instances": 12,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_8",
        "instances": 20,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_9",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "material_10",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "material_11",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_12",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -293585.625,
          -21980.18085,
          -228889.75517
        ],
        "bboxMax": [
          277933.75,
          66979.89063,
          276071.25517
        ],
        "renderVertexCount": 97560,
        "uploadVertexCount": 46792,
        "uploadNaiveVertexCount": 53440
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 512,
        "vertices": 1024,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 12288
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 368,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 4416
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3114,
        "vertices": 5277,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 66177
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 128,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 144,
        "vertices": 288,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4608
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 73,
        "vertices": 99,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1725
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 728,
        "vertices": 1456,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 17472
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 60,
        "vertices": 120,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1440
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 22,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 492
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 288
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 168,
        "vertices": 288,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 3600
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3442,
        "vertices": 6164,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 76128
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4772,
        "vertices": 8555,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 105627
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2796,
        "vertices": 4504,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 57312
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2426,
        "vertices": 3296,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 70588
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 36,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 648
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 78,
        "vertices": 90,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 1278
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5147,
        "vertices": 8029,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 103143
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5272,
        "vertices": 6714,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 92058
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 240
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 21,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_1",
        "instances": 6,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_2",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_3",
        "instances": 3,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_4",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_5",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_6",
        "instances": 15,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_7",
        "instances": 12,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_8",
        "instances": 20,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_9",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "material_10",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "material_11",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "material_12",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/Marine/buildings/skyscraper.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -15.88957,
          -0.00003,
          -59.84683
        ],
        "bboxMax": [
          61.00459,
          985.11707,
          59.84677
        ],
        "renderVertexCount": 100638,
        "uploadVertexCount": 50743,
        "uploadNaiveVertexCount": 50743
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Building_Wins2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5994,
        "vertices": 8212,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 208416
      },
      {
        "name": "Building_Wins1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21798,
        "vertices": 33169,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 827337
      },
      {
        "name": "Building_Glass_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1308,
        "vertices": 2436,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 49260
      },
      {
        "name": "Building_Metal2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2642,
        "vertices": 3650,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 92502
      },
      {
        "name": "Building_Metal_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 442,
        "vertices": 766,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 18738
      },
      {
        "name": "Building_Concrete_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 268,
        "vertices": 304,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32"
        ],
        "instances": 1,
        "size": 6776
      },
      {
        "name": "Building_Emissive Red_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 900
      },
      {
        "name": "Logo__0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1074,
        "vertices": 2146,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 25758
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Logo__0",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wins2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wins1",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "Metal2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Metal",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Concrete",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Emissive_Red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 314263,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 15898,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 426000,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 11914,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 868852,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 697942,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 785513,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1042771,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 811561,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1170967,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 435897,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -15.88957,
          -0.00003,
          -59.84683
        ],
        "bboxMax": [
          61.00459,
          985.11707,
          59.84677
        ],
        "renderVertexCount": 86610,
        "uploadVertexCount": 46067,
        "uploadNaiveVertexCount": 46067
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Building_Wins2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5094,
        "vertices": 7312,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 184116
      },
      {
        "name": "Building_Wins1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 18528,
        "vertices": 29899,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 739047
      },
      {
        "name": "Building_Glass_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1308,
        "vertices": 2436,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 49260
      },
      {
        "name": "Building_Metal2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2244,
        "vertices": 3252,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 81756
      },
      {
        "name": "Building_Metal_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 375,
        "vertices": 699,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32",
          "TEXCOORD_2:f32"
        ],
        "instances": 1,
        "size": 16929
      },
      {
        "name": "Building_Concrete_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 227,
        "vertices": 263,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:f32"
        ],
        "instances": 1,
        "size": 5833
      },
      {
        "name": "Building_Emissive Red_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 900
      },
      {
        "name": "Logo__0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1074,
        "vertices": 2146,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm"
        ],
        "instances": 1,
        "size": 25758
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Logo__0",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wins2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wins1",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "Metal2",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Metal",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Concrete",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Emissive_Red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 45614,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 15898,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 73180,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 11914,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 240492,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 697942,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 252536,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1042771,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 811561,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 91804,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 435897,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/Marine/buildings/skyscraper_tower.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -40.03636,
          -0.18772,
          -19.71398
        ],
        "bboxMax": [
          39.96364,
          146.46002,
          19.88684
        ],
        "renderVertexCount": 304893,
        "uploadVertexCount": 166208,
        "uploadNaiveVertexCount": 166208
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 146,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2474
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 134,
        "vertices": 128,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2468
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 98,
        "vertices": 92,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1784
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 26,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 482
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5814,
        "vertices": 6922,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 124870
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8730,
        "vertices": 11624,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 203492
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3902,
        "vertices": 4682,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 84278
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 9500,
        "vertices": 12236,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 216068
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2761,
        "vertices": 4188,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 71010
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 11320,
        "vertices": 11859,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 222087
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4166,
        "vertices": 6004,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 103048
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 336,
        "vertices": 672,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10752
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 15960,
        "vertices": 31705,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 507925
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3610,
        "vertices": 6996,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 112608
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13360,
        "vertices": 26720,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 427520
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 14508,
        "vertices": 29016,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 464256
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1896,
        "vertices": 3344,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 54848
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5416,
        "vertices": 9848,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 160520
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "GRASS",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "ROAD",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "SITE",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "base_material1",
        "instances": 6,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "helipad",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "mullions",
        "instances": 7,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -40.03636,
          -0.18772,
          -19.71398
        ],
        "bboxMax": [
          39.96364,
          146.46002,
          19.88684
        ],
        "renderVertexCount": 283743,
        "uploadVertexCount": 159734,
        "uploadNaiveVertexCount": 159734
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 81,
        "vertices": 131,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2189
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 101,
        "vertices": 116,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2114
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 83,
        "vertices": 82,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1564
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 22,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 406
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4940,
        "vertices": 6097,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 108901
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 7420,
        "vertices": 10374,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 179382
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3316,
        "vertices": 4153,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 73885
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8075,
        "vertices": 10896,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 190098
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2584,
        "vertices": 4012,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 67660
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 9622,
        "vertices": 10459,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 193699
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3541,
        "vertices": 5379,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 91173
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 336,
        "vertices": 672,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10752
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 15874,
        "vertices": 31619,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 506291
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3530,
        "vertices": 6916,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 111088
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13360,
        "vertices": 26720,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 427520
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 14508,
        "vertices": 29016,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 464256
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1856,
        "vertices": 3304,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 54088
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5334,
        "vertices": 9766,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 158962
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "GRASS",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "ROAD",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "SITE",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "base_material1",
        "instances": 6,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "helipad",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "mullions",
        "instances": 7,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/overhead_lights.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "overheadLights(Clone)",
        "bboxMin": [
          -0.48,
          -0.00999,
          -0.65
        ],
        "bboxMax": [
          0.78,
          0.68386,
          -0.46
        ],
        "renderVertexCount": 1296,
        "uploadVertexCount": 644,
        "uploadNaiveVertexCount": 644
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh overheadLights",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 432,
        "vertices": 644,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 13540
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "overheadLights(Clone)",
        "bboxMin": [
          -0.48,
          -0.00999,
          -0.65
        ],
        "bboxMax": [
          0.78,
          0.68386,
          -0.46
        ],
        "renderVertexCount": 1269,
        "uploadVertexCount": 635,
        "uploadNaiveVertexCount": 635
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh overheadLights",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 3,
        "glPrimitives": 423,
        "vertices": 635,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 13333
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "road",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/pine_round.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineRoundA",
        "bboxMin": [
          -0.30851,
          -0.05,
          -0.35624
        ],
        "bboxMax": [
          0.30851,
          1.31644,
          0.35624
        ],
        "renderVertexCount": 612,
        "uploadVertexCount": 316,
        "uploadNaiveVertexCount": 316
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineRoundA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 204,
        "vertices": 316,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 6596
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineRoundA",
        "bboxMin": [
          -0.30851,
          -0.05,
          -0.35624
        ],
        "bboxMax": [
          0.30851,
          1.31644,
          0.35624
        ],
        "renderVertexCount": 612,
        "uploadVertexCount": 316,
        "uploadNaiveVertexCount": 316
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineRoundA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 204,
        "vertices": 316,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 6596
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/pine_tall_a.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineTallA_detailed",
        "bboxMin": [
          -0.17919,
          -0.05,
          -0.19391
        ],
        "bboxMax": [
          0.2071,
          1.47961,
          0.19803
        ],
        "renderVertexCount": 402,
        "uploadVertexCount": 224,
        "uploadNaiveVertexCount": 224
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineTallA_detailed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 134,
        "vertices": 224,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 4612
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineTallA_detailed",
        "bboxMin": [
          -0.17919,
          -0.05,
          -0.19391
        ],
        "bboxMax": [
          0.2071,
          1.47961,
          0.19803
        ],
        "renderVertexCount": 402,
        "uploadVertexCount": 224,
        "uploadNaiveVertexCount": 224
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineTallA_detailed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 134,
        "vertices": 224,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 4612
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/pine_tall_b.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineTallB_detailed",
        "bboxMin": [
          -0.17917,
          -0.05,
          -0.19393
        ],
        "bboxMax": [
          0.20708,
          1.88461,
          0.19805
        ],
        "renderVertexCount": 498,
        "uploadVertexCount": 272,
        "uploadNaiveVertexCount": 272
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineTallB_detailed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 166,
        "vertices": 272,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5620
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tree_pineTallB_detailed",
        "bboxMin": [
          -0.17917,
          -0.05,
          -0.19393
        ],
        "bboxMax": [
          0.20708,
          1.88461,
          0.19805
        ],
        "renderVertexCount": 498,
        "uploadVertexCount": 272,
        "uploadNaiveVertexCount": 272
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh tree_pineTallB_detailed",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 166,
        "vertices": 272,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5620
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "leafsDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "woodBarkDark",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/pits_garage.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pitsGarage(Clone)",
        "bboxMin": [
          -0.34999,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.64999,
          0.69,
          -0.56
        ],
        "renderVertexCount": 288,
        "uploadVertexCount": 164,
        "uploadNaiveVertexCount": 164
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 96,
        "vertices": 164,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3364
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "tankco",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "tankcoBanner",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x128",
        "size": 3963,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pitsGarage(Clone)",
        "bboxMin": [
          -0.34999,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.64999,
          0.69,
          -0.56
        ],
        "renderVertexCount": 288,
        "uploadVertexCount": 164,
        "uploadNaiveVertexCount": 164
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 96,
        "vertices": 164,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3364
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "tankco",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "tankcoBanner",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x128",
        "size": 3580,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/pits_office.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pitsOffice(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.65,
          0.5,
          -0.61
        ],
        "renderVertexCount": 264,
        "uploadVertexCount": 138,
        "uploadNaiveVertexCount": 552
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 88,
        "vertices": 138,
        "indices": [
          "u32"
        ],
        "attributes": [
          "NORMAL:f32",
          "POSITION:f32",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5472
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pitsOffice(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.65,
          0.5,
          -0.61
        ],
        "renderVertexCount": 264,
        "uploadVertexCount": 138,
        "uploadNaiveVertexCount": 552
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 4,
        "glPrimitives": 88,
        "vertices": 138,
        "indices": [
          "u32"
        ],
        "attributes": [
          "NORMAL:f32",
          "POSITION:f32",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 5472
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "glass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "_defaultMat",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/pylon.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pylon(Clone)",
        "bboxMin": [
          -0.41,
          -0.01,
          -0.71
        ],
        "bboxMax": [
          -0.29,
          0.122,
          -0.59
        ],
        "renderVertexCount": 324,
        "uploadVertexCount": 168,
        "uploadNaiveVertexCount": 168
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh pylon",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 108,
        "vertices": 168,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3504
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "pylon",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "pylon(Clone)",
        "bboxMin": [
          -0.41,
          -0.01,
          -0.71
        ],
        "bboxMax": [
          -0.29,
          0.122,
          -0.59
        ],
        "renderVertexCount": 324,
        "uploadVertexCount": 168,
        "uploadNaiveVertexCount": 168
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh pylon",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 108,
        "vertices": 168,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3504
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "pylon",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/race_drag_start_and_finish_line.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.73334,
          -0.00154,
          -11.89815
        ],
        "bboxMax": [
          0.09191,
          7.94872,
          11.89815
        ],
        "renderVertexCount": 876,
        "uploadVertexCount": 584,
        "uploadNaiveVertexCount": 584
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Plane.001_Start_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      },
      {
        "name": "Plane.001_Steal_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 576,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9216
      },
      {
        "name": "Plane.001_Finish_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Start",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Steal",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Finish",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x128",
        "size": 25349,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x128",
        "size": 20872,
        "gpuSize": 349532
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.73334,
          -0.00154,
          -11.89815
        ],
        "bboxMax": [
          0.09191,
          7.94872,
          11.89815
        ],
        "renderVertexCount": 876,
        "uploadVertexCount": 584,
        "uploadNaiveVertexCount": 584
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Plane.001_Start_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      },
      {
        "name": "Plane.001_Steal_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 576,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9216
      },
      {
        "name": "Plane.001_Finish_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2,
        "vertices": 4,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 64
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Start",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Steal",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Finish",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x128",
        "size": 9866,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x128",
        "size": 7580,
        "gpuSize": 349532
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/rocks/40_rocks.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -4.79412,
          -0.4777,
          -1.95758
        ],
        "bboxMax": [
          5.05125,
          0.5889,
          1.86497
        ],
        "renderVertexCount": 92160,
        "uploadVertexCount": 17640,
        "uploadNaiveVertexCount": 17640
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4608,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 62046
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3072,
        "vertices": 1764,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 41364
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "RockTex",
        "instances": 7,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 463852,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -4.79412,
          -0.4777,
          -1.95758
        ],
        "bboxMax": [
          5.05125,
          0.5889,
          1.86497
        ],
        "renderVertexCount": 78318,
        "uploadVertexCount": 15210,
        "uploadNaiveVertexCount": 15210
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2286,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53214
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2282,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53162
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2276,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53084
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2278,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53110
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2285,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53201
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3916,
        "vertices": 2276,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53084
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2610,
        "vertices": 1527,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 35511
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "RockTex",
        "instances": 7,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 156466,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/rocks/blocky_rocks.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -700.02613,
          -77.9083,
          -529.72506
        ],
        "bboxMax": [
          662.74132,
          690.02157,
          485.87825
        ],
        "renderVertexCount": 18090,
        "uploadVertexCount": 2792,
        "uploadNaiveVertexCount": 3743
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "rock1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 312,
        "vertices": 226,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 5714
      },
      {
        "name": "rock1_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 312,
        "vertices": 226,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 5714
      },
      {
        "name": "rock2_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 286,
        "vertices": 191,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 4963
      },
      {
        "name": "rock3_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 198,
        "vertices": 131,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 3415
      },
      {
        "name": "rock2_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 286,
        "vertices": 191,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 4963
      },
      {
        "name": "rock3_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 198,
        "vertices": 131,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 3415
      },
      {
        "name": "rock4_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 660,
        "vertices": 403,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 10811
      },
      {
        "name": "rock4_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 660,
        "vertices": 403,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 10811
      },
      {
        "name": "rock5_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 912,
        "vertices": 525,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 14397
      },
      {
        "name": "rock5_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 912,
        "vertices": 525,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 14397
      },
      {
        "name": "rock6_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 598,
        "vertices": 358,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 9674
      },
      {
        "name": "rock7_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 696,
        "vertices": 433,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 11537
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "rockset1",
        "instances": 12,
        "textures": [
          "normalTexture",
          "diffuseTexture",
          "specularGlossinessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "diffuseTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1098755,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "specularGlossinessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1339347,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1523622,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -700.02613,
          -77.9083,
          -529.72506
        ],
        "bboxMax": [
          662.74132,
          690.02157,
          485.87825
        ],
        "renderVertexCount": 17982,
        "uploadVertexCount": 2774,
        "uploadNaiveVertexCount": 3725
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "rock1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 312,
        "vertices": 226,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 5714
      },
      {
        "name": "rock1_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 312,
        "vertices": 226,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 5714
      },
      {
        "name": "rock2_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 286,
        "vertices": 191,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 4963
      },
      {
        "name": "rock3_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 198,
        "vertices": 131,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 3415
      },
      {
        "name": "rock2_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 286,
        "vertices": 191,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 4963
      },
      {
        "name": "rock3_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 198,
        "vertices": 131,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 3415
      },
      {
        "name": "rock4_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 660,
        "vertices": 403,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 10811
      },
      {
        "name": "rock4_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 660,
        "vertices": 403,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 10811
      },
      {
        "name": "rock5_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 894,
        "vertices": 516,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 14136
      },
      {
        "name": "rock5_1_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 894,
        "vertices": 516,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 14136
      },
      {
        "name": "rock6_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 598,
        "vertices": 358,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 9674
      },
      {
        "name": "rock7_rockset1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 696,
        "vertices": 433,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 11537
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "rockset1",
        "instances": 12,
        "textures": [
          "normalTexture",
          "diffuseTexture",
          "specularGlossinessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "diffuseTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1098755,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "specularGlossinessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1339347,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1523622,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/rocks/rocks_photogrammetry_scan.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -12.92402,
          -0.0356,
          -8.03634
        ],
        "bboxMax": [
          10.72586,
          4.23279,
          6.59264
        ],
        "renderVertexCount": 845346,
        "uploadVertexCount": 198182,
        "uploadNaiveVertexCount": 198182
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 103922,
        "vertices": 65532,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1475448
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 103525,
        "vertices": 65532,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1473066
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 73709,
        "vertices": 65532,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1294170
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 626,
        "vertices": 1586,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 24374
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Rocks2",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 768643,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -12.92402,
          -0.03867,
          -8.03634
        ],
        "bboxMax": [
          10.72586,
          4.23279,
          6.59264
        ],
        "renderVertexCount": 718533,
        "uploadVertexCount": 176736,
        "uploadNaiveVertexCount": 176736
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 88333,
        "vertices": 57723,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1280397
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 87995,
        "vertices": 57747,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1278681
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 62651,
        "vertices": 59910,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1154736
      },
      {
        "name": "Rocks2.001_Rocks2_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 532,
        "vertices": 1356,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 20820
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Rocks2",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 281034,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/rocks/stylized_rocks.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.46764,
          -1.03825,
          -2.78111
        ],
        "bboxMax": [
          3.10513,
          6.2478,
          2.86437
        ],
        "renderVertexCount": 31962,
        "uploadVertexCount": 5490,
        "uploadNaiveVertexCount": 5490
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Low_Low_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10654,
        "vertices": 5490,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 157254
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 769693,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 147281,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 770997,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.46764,
          -1.03825,
          -2.78111
        ],
        "bboxMax": [
          3.10513,
          6.2478,
          2.86437
        ],
        "renderVertexCount": 27162,
        "uploadVertexCount": 4683,
        "uploadNaiveVertexCount": 4683
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Low_Low_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 9054,
        "vertices": 4683,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 133935
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 89914,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 147281,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 770997,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/rock_large.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_largeA",
        "bboxMin": [
          -0.39245,
          -0.04999,
          -0.50773
        ],
        "bboxMax": [
          0.39245,
          0.20977,
          0.50773
        ],
        "renderVertexCount": 240,
        "uploadVertexCount": 146,
        "uploadNaiveVertexCount": 146
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_largeA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 80,
        "vertices": 146,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2962
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "rock_largeA",
        "bboxMin": [
          -0.39245,
          -0.04999,
          -0.50773
        ],
        "bboxMax": [
          0.39245,
          0.20977,
          0.50773
        ],
        "renderVertexCount": 240,
        "uploadVertexCount": 146,
        "uploadNaiveVertexCount": 146
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh rock_largeA",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 80,
        "vertices": 146,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2962
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "dirt",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grass",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/2ff77d68adf6448a936fa1b1575133cb.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.3238,
          -9.00408,
          -3.01371
        ],
        "bboxMax": [
          1.53882,
          -6.05575,
          0.35309
        ],
        "renderVertexCount": 87246,
        "uploadVertexCount": 15409,
        "uploadNaiveVertexCount": 15409
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 29082,
        "vertices": 15409,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 374809
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 476359,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.3238,
          -9.00408,
          -3.01371
        ],
        "bboxMax": [
          1.53882,
          -6.05575,
          0.35309
        ],
        "renderVertexCount": 74157,
        "uploadVertexCount": 13219,
        "uploadNaiveVertexCount": 13219
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24719,
        "vertices": 13219,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 320161
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 120514,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/cherry_blossom_trees.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -103.0193,
          -0.00035,
          -56.95733
        ],
        "bboxMax": [
          154.01172,
          97.54263,
          55.09177
        ],
        "renderVertexCount": 470514,
        "uploadVertexCount": 290975,
        "uploadNaiveVertexCount": 290975
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20100,
        "vertices": 16023,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 392991
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16272,
        "vertices": 48794,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 731954
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 38454,
        "vertices": 32047,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775523
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21856,
        "vertices": 65534,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 983078
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 17408,
        "vertices": 52204,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 783100
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23532,
        "vertices": 18743,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 459823
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 19216,
        "vertices": 57630,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 864486
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "bark",
        "instances": 3,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "foliage",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2217495,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 484322,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2559592,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 569613,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -103.0193,
          -0.00035,
          -56.95733
        ],
        "bboxMax": [
          154.01172,
          97.54263,
          55.09177
        ],
        "renderVertexCount": 432312,
        "uploadVertexCount": 283629,
        "uploadNaiveVertexCount": 283629
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 17084,
        "vertices": 14326,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 346046
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16272,
        "vertices": 48794,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 731954
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32266,
        "vertices": 28429,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 676889
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21856,
        "vertices": 65534,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 983078
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 17408,
        "vertices": 52204,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 783100
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20002,
        "vertices": 16712,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 404116
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 19216,
        "vertices": 57630,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 864486
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "bark",
        "instances": 3,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "foliage",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 389870,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 484322,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2559592,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 203146,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/chinese_architecture.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -6197.34224,
          83.27916,
          3141.7341
        ],
        "bboxMax": [
          -4761.40578,
          1072.5754,
          3586.09573
        ],
        "renderVertexCount": 2814,
        "uploadVertexCount": 2251,
        "uploadNaiveVertexCount": 2251
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object097_Material #25_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 932,
        "vertices": 2238,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 34686
      },
      {
        "name": "Object097_Material #37_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 13,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 205
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material_25",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material_37",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 274201,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 309778,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -6197.34224,
          83.27916,
          3141.7341
        ],
        "bboxMax": [
          -4761.40578,
          1072.5754,
          3586.09573
        ],
        "renderVertexCount": 2742,
        "uploadVertexCount": 2227,
        "uploadNaiveVertexCount": 2227
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object097_Material #25_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 908,
        "vertices": 2214,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 34230
      },
      {
        "name": "Object097_Material #37_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 13,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 205
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material_25",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material_37",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 51502,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 86802,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/chinese_fantasy_03_-_revisited.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -123.23097,
          0.89747,
          -68.54711
        ],
        "bboxMax": [
          123.23097,
          126.60564,
          68.5421
        ],
        "renderVertexCount": 391236,
        "uploadVertexCount": 177502,
        "uploadNaiveVertexCount": 177502
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 360,
        "vertices": 720,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11520
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 96,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 444,
        "vertices": 888,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14208
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 160,
        "vertices": 306,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4938
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 664
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 176,
        "vertices": 230,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4046
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 400,
        "vertices": 800,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12800
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 128,
        "vertices": 256,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4096
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 136,
        "vertices": 196,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3364
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 20,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 412
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 480,
        "vertices": 362,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7586
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1812,
        "vertices": 1828,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 34636
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2000,
        "vertices": 1660,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 33580
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 372,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6564
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 712
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1992,
        "vertices": 1800,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 42552
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 280,
        "vertices": 352,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6256
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6784,
        "vertices": 7642,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 140050
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 492,
        "vertices": 432,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8568
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 140,
        "vertices": 154,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2842
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1488,
        "vertices": 2493,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 41337
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 392,
        "vertices": 433,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9713
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 120,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1944
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 84,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1380
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 712,
        "vertices": 648,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12696
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 372,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6564
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 496,
        "vertices": 612,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10932
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 88,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1432
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1248,
        "vertices": 1520,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 27248
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8944,
        "vertices": 15424,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 254176
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 192,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3840
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 128,
        "vertices": 256,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4096
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 384,
        "vertices": 604,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10156
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 800,
        "vertices": 756,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14628
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1752,
        "vertices": 1560,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 30792
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 768,
        "vertices": 1192,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 20104
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 816,
        "vertices": 912,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 16752
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 392,
        "vertices": 468,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8436
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 816
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32,
        "vertices": 36,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 660
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1872,
        "vertices": 1860,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 42852
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 304,
        "vertices": 408,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7128
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 29828,
        "vertices": 52021,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 855241
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5952,
        "vertices": 10140,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 167532
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 728,
        "vertices": 866,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 15626
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 18,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 330
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 256,
        "vertices": 278,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5150
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1112,
        "vertices": 1040,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 20192
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 256,
        "vertices": 440,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7256
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 776,
        "vertices": 1024,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 17968
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 344,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 7576
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 72,
        "vertices": 112,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1888
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 432,
        "vertices": 356,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7220
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 504,
        "vertices": 678,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11838
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 22,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 382
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 104,
        "vertices": 136,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2936
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2176,
        "vertices": 2004,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 39108
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 860,
        "vertices": 876,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 16548
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 400,
        "vertices": 568,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9784
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 256,
        "vertices": 292,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5332
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 44,
        "vertices": 52,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 940
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3744,
        "vertices": 2828,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 59228
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 132,
        "vertices": 164,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2924
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 54,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1254
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 796,
        "vertices": 796,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 15124
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 444,
        "vertices": 428,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8228
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1544,
        "vertices": 1824,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 32976
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 104,
        "vertices": 88,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1768
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 128,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3056
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1224,
        "vertices": 1560,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 33864
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 160,
        "vertices": 212,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3716
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 140,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2228
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 458,
        "vertices": 456,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8676
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 456,
        "vertices": 376,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7624
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 112,
        "vertices": 128,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2336
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 384,
        "vertices": 480,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8544
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 336,
        "vertices": 288,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5760
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 292,
        "vertices": 588,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9396
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 700,
        "vertices": 770,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14210
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 196,
        "vertices": 252,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4452
      },
      {
        "name": "Object_84",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 408
      },
      {
        "name": "Object_85",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 116,
        "vertices": 140,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2516
      },
      {
        "name": "Object_86",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 104,
        "vertices": 208,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3328
      },
      {
        "name": "Object_87",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 164,
        "vertices": 282,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4650
      },
      {
        "name": "Object_88",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1400,
        "vertices": 2432,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 40016
      },
      {
        "name": "Object_89",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 192,
        "vertices": 200,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3752
      },
      {
        "name": "Object_90",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 120,
        "vertices": 184,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3112
      },
      {
        "name": "Object_91",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 112,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2032
      },
      {
        "name": "Object_92",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 184,
        "vertices": 196,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3652
      },
      {
        "name": "Object_93",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 120,
        "vertices": 168,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2904
      },
      {
        "name": "Object_94",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13240,
        "vertices": 12904,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 247192
      },
      {
        "name": "Object_95",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 624,
        "vertices": 864,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14976
      },
      {
        "name": "Object_96",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 152,
        "vertices": 254,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4214
      },
      {
        "name": "Object_97",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 108,
        "vertices": 216,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3456
      },
      {
        "name": "Object_98",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 480
      },
      {
        "name": "Object_99",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4,
        "vertices": 8,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 128
      },
      {
        "name": "Object_100",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 44,
        "vertices": 88,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1408
      },
      {
        "name": "Object_101",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 640
      },
      {
        "name": "Object_102",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_103",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_104",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 136,
        "vertices": 156,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2844
      },
      {
        "name": "Object_105",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 120,
        "vertices": 144,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2592
      },
      {
        "name": "Object_106",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3824,
        "vertices": 4840,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 85864
      },
      {
        "name": "Object_107",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3228,
        "vertices": 4448,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 77192
      },
      {
        "name": "Object_108",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 300,
        "vertices": 508,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8404
      },
      {
        "name": "Object_109",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 28,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 508
      },
      {
        "name": "Object_110",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 320,
        "vertices": 480,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8160
      },
      {
        "name": "Object_111",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 88,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1624
      },
      {
        "name": "Object_112",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 168,
        "vertices": 248,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4232
      },
      {
        "name": "Object_113",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 768
      },
      {
        "name": "Object_114",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 990,
        "vertices": 1209,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 26493
      },
      {
        "name": "Object_115",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 528,
        "vertices": 646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11566
      },
      {
        "name": "Object_116",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 88,
        "vertices": 112,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1984
      },
      {
        "name": "Object_117",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 556,
        "vertices": 796,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 13684
      },
      {
        "name": "Object_118",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 584
      },
      {
        "name": "Object_119",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 192,
        "vertices": 384,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6144
      },
      {
        "name": "Object_120",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 768
      },
      {
        "name": "Object_121",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32,
        "vertices": 56,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 920
      },
      {
        "name": "Object_122",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 476,
        "vertices": 768,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12840
      },
      {
        "name": "Object_123",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 54,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1254
      },
      {
        "name": "Object_124",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 88,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3520
      },
      {
        "name": "Object_125",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 316,
        "vertices": 284,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5588
      },
      {
        "name": "Object_126",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1404
      },
      {
        "name": "Object_127",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 96,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_128",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 704,
        "vertices": 782,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14390
      },
      {
        "name": "Object_129",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 68,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1220
      },
      {
        "name": "Object_130",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 60,
        "vertices": 68,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1244
      },
      {
        "name": "Object_131",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 124,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1996
      },
      {
        "name": "Object_132",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 88,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1552
      },
      {
        "name": "Object_133",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 36,
        "vertices": 72,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1440
      },
      {
        "name": "Object_134",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 134,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2222
      },
      {
        "name": "Object_135",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_136",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 276,
        "vertices": 280,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5296
      },
      {
        "name": "Object_137",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 112,
        "vertices": 144,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2544
      },
      {
        "name": "Object_138",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_139",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 72,
        "vertices": 144,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2304
      },
      {
        "name": "Object_140",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 920,
        "vertices": 988,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 18364
      },
      {
        "name": "Object_141",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 296,
        "vertices": 328,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6040
      },
      {
        "name": "Object_142",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 740,
        "vertices": 956,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 16868
      },
      {
        "name": "Object_143",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 296,
        "vertices": 408,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 8712
      },
      {
        "name": "Object_144",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2168,
        "vertices": 4080,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 66048
      },
      {
        "name": "Object_145",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2528,
        "vertices": 2528,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 58144
      },
      {
        "name": "Object_146",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 608,
        "vertices": 756,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 13476
      },
      {
        "name": "Object_147",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 138,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2370
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Woods",
        "instances": 30,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Doors",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "GrayConc",
        "instances": 8,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls3",
        "instances": 3,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Walls_General",
        "instances": 17,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wood_Bars",
        "instances": 23,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "MainFront",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Main_Pillar",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roofs",
        "instances": 22,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roof_001_Side",
        "instances": 6,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roof_Borders",
        "instances": 2,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "RestPillar",
        "instances": 8,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Gold",
        "instances": 5,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls",
        "instances": 5,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Base_Conc2",
        "instances": 4,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_MainWalls",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Base_Conc1",
        "instances": 3,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls2",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 375714,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 537200,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 324869,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 352554,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 157671,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 388154,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "256x1024",
        "size": 108150,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "256x1024",
        "size": 21045,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "256x1024",
        "size": 53098,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "256x1024",
        "size": 27878,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 207799,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 313720,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 53658,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x256",
        "size": 94652,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 449593,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 100327,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 403339,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 224252,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 399179,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 252453,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 16479,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 332943,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 211675,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 315161,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -123.23097,
          0.89747,
          -68.54711
        ],
        "bboxMax": [
          123.23097,
          126.60564,
          68.5421
        ],
        "renderVertexCount": 350715,
        "uploadVertexCount": 166792,
        "uploadNaiveVertexCount": 166792
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 360,
        "vertices": 720,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11520
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 96,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 444,
        "vertices": 888,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14208
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 154,
        "vertices": 302,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4850
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 36,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 588
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 149,
        "vertices": 205,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3559
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 368,
        "vertices": 768,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12192
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 128,
        "vertices": 256,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4096
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 115,
        "vertices": 175,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2965
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 10,
        "vertices": 18,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 366
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 408,
        "vertices": 325,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6673
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1540,
        "vertices": 1653,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 30729
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1699,
        "vertices": 1473,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 29343
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 243,
        "vertices": 334,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5800
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 36,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 636
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1693,
        "vertices": 1610,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 37528
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 238,
        "vertices": 315,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5523
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5766,
        "vertices": 6793,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 122905
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 418,
        "vertices": 386,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7526
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 119,
        "vertices": 137,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2495
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1384,
        "vertices": 2397,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 39465
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 332,
        "vertices": 391,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 8639
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 112,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1792
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 40,
        "vertices": 76,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1228
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 605,
        "vertices": 585,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11235
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 244,
        "vertices": 334,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5806
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 420,
        "vertices": 556,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9748
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 40,
        "vertices": 80,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1280
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1060,
        "vertices": 1395,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 24495
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8544,
        "vertices": 15060,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 247044
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 96,
        "vertices": 192,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3840
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 128,
        "vertices": 256,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4096
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 326,
        "vertices": 546,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9054
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 680,
        "vertices": 674,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12842
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1488,
        "vertices": 1416,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 27336
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 652,
        "vertices": 1076,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 17900
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 693,
        "vertices": 819,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14805
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 332,
        "vertices": 428,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7556
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 43,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 721
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 578
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1590,
        "vertices": 1681,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 38117
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 258,
        "vertices": 362,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6254
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28766,
        "vertices": 51045,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 836181
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5736,
        "vertices": 9944,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 163688
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 618,
        "vertices": 762,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 13614
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13,
        "vertices": 15,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 273
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 217,
        "vertices": 250,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4552
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 944,
        "vertices": 927,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 17715
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 256,
        "vertices": 440,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7256
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 659,
        "vertices": 907,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 15745
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 244,
        "vertices": 300,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 6564
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 61,
        "vertices": 101,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1679
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 367,
        "vertices": 310,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6232
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 428,
        "vertices": 602,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10394
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13,
        "vertices": 19,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 325
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 88,
        "vertices": 120,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 2568
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1848,
        "vertices": 1799,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 34475
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 731,
        "vertices": 784,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14578
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 340,
        "vertices": 508,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8644
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 217,
        "vertices": 253,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4591
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 37,
        "vertices": 45,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 807
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3182,
        "vertices": 2456,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 51020
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 112,
        "vertices": 144,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2544
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 47,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1098
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 676,
        "vertices": 712,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 13312
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 377,
        "vertices": 367,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7033
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1312,
        "vertices": 1673,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 29621
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 87,
        "vertices": 79,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1549
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 108,
        "vertices": 156,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2676
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1040,
        "vertices": 1403,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 30091
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 136,
        "vertices": 194,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3338
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 140,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2228
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 388,
        "vertices": 413,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7697
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 386,
        "vertices": 329,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6593
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 95,
        "vertices": 111,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2013
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 326,
        "vertices": 422,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7442
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 284,
        "vertices": 260,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5084
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 292,
        "vertices": 588,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9396
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 595,
        "vertices": 684,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12462
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 165,
        "vertices": 221,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3863
      },
      {
        "name": "Object_84",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 13,
        "vertices": 21,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 351
      },
      {
        "name": "Object_85",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 98,
        "vertices": 122,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2174
      },
      {
        "name": "Object_86",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 104,
        "vertices": 208,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3328
      },
      {
        "name": "Object_87",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 142,
        "vertices": 266,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4310
      },
      {
        "name": "Object_88",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1304,
        "vertices": 2336,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 38192
      },
      {
        "name": "Object_89",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 162,
        "vertices": 178,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3286
      },
      {
        "name": "Object_90",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 102,
        "vertices": 166,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2770
      },
      {
        "name": "Object_91",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 96,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1728
      },
      {
        "name": "Object_92",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 156,
        "vertices": 178,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3250
      },
      {
        "name": "Object_93",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 120,
        "vertices": 168,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2904
      },
      {
        "name": "Object_94",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 11254,
        "vertices": 11440,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 216244
      },
      {
        "name": "Object_95",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 530,
        "vertices": 770,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 13190
      },
      {
        "name": "Object_96",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 150,
        "vertices": 252,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4176
      },
      {
        "name": "Object_97",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 104,
        "vertices": 208,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3328
      },
      {
        "name": "Object_98",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 480
      },
      {
        "name": "Object_99",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4,
        "vertices": 8,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 128
      },
      {
        "name": "Object_100",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 37,
        "vertices": 75,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1197
      },
      {
        "name": "Object_101",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 40,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 640
      },
      {
        "name": "Object_102",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_103",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 8,
        "vertices": 16,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 256
      },
      {
        "name": "Object_104",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 114,
        "vertices": 134,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2426
      },
      {
        "name": "Object_105",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 102,
        "vertices": 126,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2250
      },
      {
        "name": "Object_106",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3249,
        "vertices": 4338,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 75888
      },
      {
        "name": "Object_107",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2742,
        "vertices": 4012,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 68608
      },
      {
        "name": "Object_108",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 272,
        "vertices": 480,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7872
      },
      {
        "name": "Object_109",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 20,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 432
      },
      {
        "name": "Object_110",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 448,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 7552
      },
      {
        "name": "Object_111",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 76,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1396
      },
      {
        "name": "Object_112",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 142,
        "vertices": 222,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3738
      },
      {
        "name": "Object_113",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 768
      },
      {
        "name": "Object_114",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 840,
        "vertices": 1059,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 23043
      },
      {
        "name": "Object_115",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 448,
        "vertices": 576,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 10176
      },
      {
        "name": "Object_116",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 74,
        "vertices": 98,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1718
      },
      {
        "name": "Object_117",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 472,
        "vertices": 712,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12088
      },
      {
        "name": "Object_118",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 27,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 489
      },
      {
        "name": "Object_119",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 192,
        "vertices": 384,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 6144
      },
      {
        "name": "Object_120",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 768
      },
      {
        "name": "Object_121",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 32,
        "vertices": 56,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 920
      },
      {
        "name": "Object_122",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 404,
        "vertices": 696,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11472
      },
      {
        "name": "Object_123",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 47,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1098
      },
      {
        "name": "Object_124",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 88,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3520
      },
      {
        "name": "Object_125",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 268,
        "vertices": 252,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4884
      },
      {
        "name": "Object_126",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 64,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1404
      },
      {
        "name": "Object_127",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 48,
        "vertices": 96,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1536
      },
      {
        "name": "Object_128",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 598,
        "vertices": 698,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 12662
      },
      {
        "name": "Object_129",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 47,
        "vertices": 59,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1049
      },
      {
        "name": "Object_130",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 51,
        "vertices": 59,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1073
      },
      {
        "name": "Object_131",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 62,
        "vertices": 122,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1958
      },
      {
        "name": "Object_132",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 76,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1324
      },
      {
        "name": "Object_133",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 36,
        "vertices": 72,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1440
      },
      {
        "name": "Object_134",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 122,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1994
      },
      {
        "name": "Object_135",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_136",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 234,
        "vertices": 253,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4693
      },
      {
        "name": "Object_137",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 95,
        "vertices": 127,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2221
      },
      {
        "name": "Object_138",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 16,
        "vertices": 32,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 512
      },
      {
        "name": "Object_139",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 72,
        "vertices": 144,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2304
      },
      {
        "name": "Object_140",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 782,
        "vertices": 857,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 15833
      },
      {
        "name": "Object_141",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 250,
        "vertices": 284,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5192
      },
      {
        "name": "Object_142",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 629,
        "vertices": 850,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 14824
      },
      {
        "name": "Object_143",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 251,
        "vertices": 367,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 7745
      },
      {
        "name": "Object_144",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2160,
        "vertices": 4072,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 65896
      },
      {
        "name": "Object_145",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2148,
        "vertices": 2305,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 52073
      },
      {
        "name": "Object_146",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 516,
        "vertices": 675,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 11871
      },
      {
        "name": "Object_147",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 122,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2066
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "material_0",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Woods",
        "instances": 30,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Doors",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "GrayConc",
        "instances": 8,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls3",
        "instances": 3,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Walls_General",
        "instances": 17,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Wood_Bars",
        "instances": 23,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "MainFront",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Main_Pillar",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roofs",
        "instances": 22,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roof_001_Side",
        "instances": 6,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Roof_Borders",
        "instances": 2,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "RestPillar",
        "instances": 8,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Gold",
        "instances": 5,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls",
        "instances": 5,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Base_Conc2",
        "instances": 4,
        "textures": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_MainWalls",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Base_Conc1",
        "instances": 3,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Specific_DetailedWalls2",
        "instances": 4,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 67128,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 49770,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 74508,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 79904,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 14072,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 75934,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x1024",
        "size": 23436,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x1024",
        "size": 6412,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x1024",
        "size": 7918,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x1024",
        "size": 5176,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 20076,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 84758,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 13732,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x256",
        "size": 19654,
        "gpuSize": 1398108
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 82256,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 14122,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 39374,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 12806,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 84514,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 41622,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 7638,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 59718,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 31436,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 53218,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/chinese_hall.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2708,
          -0.04497,
          -1864.03841
        ],
        "bboxMax": [
          2708,
          2507.96812,
          1864.038
        ],
        "renderVertexCount": 32946,
        "uploadVertexCount": 16587,
        "uploadNaiveVertexCount": 16587
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "HZ_building_116_0_Material.010_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1032,
        "vertices": 1165,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 30657
      },
      {
        "name": "HZ_building_116_2_Material.012_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1972,
        "vertices": 2824,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 71136
      },
      {
        "name": "HZ_building_116_1_Material.011_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 7978,
        "vertices": 12598,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 312426
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material.010",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material.012",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material.011",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x1024",
        "size": 390668,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x1024",
        "size": 472770,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1531289,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x256",
        "size": 296,
        "gpuSize": 349524
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2055649,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1473504,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1602050,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2708,
          -0.04497,
          -1864.03841
        ],
        "bboxMax": [
          2708,
          2507.96812,
          1864.038
        ],
        "renderVertexCount": 27996,
        "uploadVertexCount": 15048,
        "uploadNaiveVertexCount": 15048
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "HZ_building_116_0_Material.010_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 876,
        "vertices": 1022,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 26718
      },
      {
        "name": "HZ_building_116_2_Material.012_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1676,
        "vertices": 2496,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 62472
      },
      {
        "name": "HZ_building_116_1_Material.011_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6780,
        "vertices": 11530,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 282810
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material.010",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material.012",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Material.011",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x1024",
        "size": 80112,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x1024",
        "size": 472770,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 311580,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x256",
        "size": 296,
        "gpuSize": 349524
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2055649,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 241350,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1602050,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/japanese_lowpoly_temple.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -27.15663,
          -0.00003,
          -29.30758
        ],
        "bboxMax": [
          20.93309,
          41.3359,
          29.30758
        ],
        "renderVertexCount": 25164,
        "uploadVertexCount": 15806,
        "uploadNaiveVertexCount": 15806
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 242,
        "vertices": 482,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9646
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 960,
        "vertices": 1780,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 36020
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 152,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3672
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4224,
        "vertices": 8166,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 196830
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2138,
        "vertices": 3976,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 96324
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 476,
        "vertices": 745,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 18501
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 216,
        "vertices": 401,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9717
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1152
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 56,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1344
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "lambert10SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert11SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert13SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert2SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert4SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert6SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert7SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert8SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert9SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1620699,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x128",
        "size": 105637,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x128",
        "size": 92145,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 458293,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1468197,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1427714,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1471120,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1861124,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1701645,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1880427,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 261517,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 211590,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 327344,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x256",
        "size": 111835,
        "gpuSize": 349524
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -27.15663,
          -0.00003,
          -29.30758
        ],
        "bboxMax": [
          20.93309,
          41.3359,
          29.30758
        ],
        "renderVertexCount": 24873,
        "uploadVertexCount": 15731,
        "uploadNaiveVertexCount": 15731
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 241,
        "vertices": 481,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9623
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 960,
        "vertices": 1780,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 36020
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 80,
        "vertices": 152,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3672
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 4224,
        "vertices": 8166,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 196830
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2080,
        "vertices": 3938,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 95178
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 464,
        "vertices": 735,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 18219
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 190,
        "vertices": 375,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9015
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 24,
        "vertices": 48,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1152
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 56,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1344
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "lambert10SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert11SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert13SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert2SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert4SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert6SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert7SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert8SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "lambert9SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 2,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 208094,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x128",
        "size": 15892,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x128",
        "size": 92145,
        "gpuSize": 349532
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 128042,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1468197,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 166224,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 233484,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 300372,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1701645,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1880427,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 35124,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 211590,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 48842,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x256",
        "size": 111835,
        "gpuSize": 349524
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/japanese_wooden_lamp_pagoda.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.06228,
          -0.13093,
          -0.06228
        ],
        "bboxMax": [
          0.06228,
          0.13093,
          0.06228
        ],
        "renderVertexCount": 64287,
        "uploadVertexCount": 12628,
        "uploadNaiveVertexCount": 12628
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "defaultMaterial",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21429,
        "vertices": 12628,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 393762
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "lambert6",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture",
          "normalTexture",
          "occlusionTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 735846,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "occlusionTexture",
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 936476,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 29625,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2533715,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.06228,
          -0.13093,
          -0.06228
        ],
        "bboxMax": [
          0.06228,
          0.13093,
          0.06228
        ],
        "renderVertexCount": 54642,
        "uploadVertexCount": 10902,
        "uploadNaiveVertexCount": 10902
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "defaultMaterial",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 18214,
        "vertices": 10902,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 338226
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "lambert6",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture",
          "normalTexture",
          "occlusionTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 260676,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "occlusionTexture",
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 936476,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 10286,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 2533715,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/sakura pass/maybe_jp_drum.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -158.29371,
          -241.01367,
          -266.67348
        ],
        "bboxMax": [
          158.29371,
          218.19187,
          266.67356
        ],
        "renderVertexCount": 283554,
        "uploadVertexCount": 84660,
        "uploadNaiveVertexCount": 84660
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "LowPoly.002_JPDrumWood_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 54422,
        "vertices": 50461,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 1184369
      },
      {
        "name": "LowPoly.002_JPDrumSteel_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 40096,
        "vertices": 34199,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 821959
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "JPDrumWood",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "JPDrumSteel",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1228933,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 360359,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1611154,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -158.29371,
          -241.01367,
          -266.67348
        ],
        "bboxMax": [
          158.29371,
          218.19187,
          266.67356
        ],
        "renderVertexCount": 241011,
        "uploadVertexCount": 76432,
        "uploadNaiveVertexCount": 76432
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "LowPoly.002_JPDrumWood_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 46257,
        "vertices": 45840,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 1056822
      },
      {
        "name": "LowPoly.002_JPDrumSteel_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 34080,
        "vertices": 30592,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm"
        ],
        "instances": 1,
        "size": 724544
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "JPDrumWood",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "JPDrumSteel",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 2,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 221246,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 360359,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 2,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1611154,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/skyscraper_a.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-a",
        "rootName": "building-skyscraper-a",
        "bboxMin": [
          -0.67999,
          0,
          -0.67999
        ],
        "bboxMax": [
          0.67999,
          2.88,
          0.67999
        ],
        "renderVertexCount": 3876,
        "uploadVertexCount": 2118,
        "uploadNaiveVertexCount": 2118
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-a",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1292,
        "vertices": 2118,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 43758
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 11002,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-a",
        "rootName": "building-skyscraper-a",
        "bboxMin": [
          -0.67999,
          0,
          -0.67999
        ],
        "bboxMax": [
          0.67999,
          2.88,
          0.67999
        ],
        "renderVertexCount": 3864,
        "uploadVertexCount": 2116,
        "uploadNaiveVertexCount": 2116
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-a",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1288,
        "vertices": 2116,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 43700
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 5112,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/skyscraper_b.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-b",
        "rootName": "building-skyscraper-b",
        "bboxMin": [
          -0.67999,
          0,
          -0.67999
        ],
        "bboxMax": [
          0.67999,
          4.48,
          0.67999
        ],
        "renderVertexCount": 4776,
        "uploadVertexCount": 2646,
        "uploadNaiveVertexCount": 2646
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-b",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1592,
        "vertices": 2646,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 54534
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 11002,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-b",
        "rootName": "building-skyscraper-b",
        "bboxMin": [
          -0.67999,
          0,
          -0.67999
        ],
        "bboxMax": [
          0.67999,
          4.48,
          0.67999
        ],
        "renderVertexCount": 4764,
        "uploadVertexCount": 2644,
        "uploadNaiveVertexCount": 2644
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-b",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1588,
        "vertices": 2644,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 54476
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 5112,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/skyscraper_c.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-c",
        "rootName": "building-skyscraper-c",
        "bboxMin": [
          -0.64001,
          0,
          -0.69392
        ],
        "bboxMax": [
          0.64001,
          4.08,
          0.69393
        ],
        "renderVertexCount": 5112,
        "uploadVertexCount": 2862,
        "uploadNaiveVertexCount": 2862
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-c",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1704,
        "vertices": 2862,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 58878
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 11002,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "building-skyscraper-c",
        "rootName": "building-skyscraper-c",
        "bboxMin": [
          -0.64001,
          0,
          -0.69392
        ],
        "bboxMax": [
          0.64001,
          4.08,
          0.69393
        ],
        "renderVertexCount": 5076,
        "uploadVertexCount": 2856,
        "uploadNaiveVertexCount": 2856
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "building-skyscraper-c",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1692,
        "vertices": 2856,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 58704
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "colormap",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "colormap",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 5112,
        "gpuSize": 1398100
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/tent.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tent(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.65,
          0.69,
          -0.65
        ],
        "renderVertexCount": 258,
        "uploadVertexCount": 156,
        "uploadNaiveVertexCount": 156
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 86,
        "vertices": 156,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3168
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "",
        "rootName": "tent(Clone)",
        "bboxMin": [
          -0.35,
          -0.01,
          -1.65
        ],
        "bboxMax": [
          0.65,
          0.69,
          -0.65
        ],
        "renderVertexCount": 258,
        "uploadVertexCount": 156,
        "uploadNaiveVertexCount": 156
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Mesh noExport",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 2,
        "glPrimitives": 86,
        "vertices": 156,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 3168
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "red",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      },
      {
        "name": "grey",
        "instances": 1,
        "textures": [],
        "alphaMode": "OPAQUE",
        "doubleSided": false
      }
    ]
  },
  "textures": {
    "properties": []
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/dry_realistic_grass_lods_1.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.61056,
          -0.58001,
          -2.20941
        ],
        "bboxMax": [
          2.74356,
          2.44176,
          3.14618
        ],
        "renderVertexCount": 20454,
        "uploadVertexCount": 7792,
        "uploadNaiveVertexCount": 7792
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6818,
        "vertices": 7792,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 142204
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 12575,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 222,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.61044,
          -0.57984,
          -2.20925
        ],
        "bboxMax": [
          2.74278,
          2.4416,
          3.1452
        ],
        "renderVertexCount": 17385,
        "uploadVertexCount": 6769,
        "uploadNaiveVertexCount": 6769
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 5795,
        "vertices": 6769,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 122767
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Material",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "emissiveTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture",
          "emissiveTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 3340,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 222,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/dry_tree_vurvur_house_5.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.81593,
          -0.0001,
          -0.56104
        ],
        "bboxMax": [
          0.66531,
          1.75985,
          0.7842
        ],
        "renderVertexCount": 5748,
        "uploadVertexCount": 1475,
        "uploadNaiveVertexCount": 1475
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "arbol.001_arbold_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1916,
        "vertices": 1475,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 42471
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "arbold",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1444640,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 365216,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1506976,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -0.81593,
          -0.0001,
          -0.56104
        ],
        "bboxMax": [
          0.66531,
          1.75985,
          0.7842
        ],
        "renderVertexCount": 5508,
        "uploadVertexCount": 1423,
        "uploadNaiveVertexCount": 1423
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "arbol.001_arbold_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1836,
        "vertices": 1423,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 40899
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "arbold",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 283520,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 365216,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1506976,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/palm_tree_tall.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.18683,
          -0.02882,
          -2.93662
        ],
        "bboxMax": [
          2.85468,
          12.36719,
          1.94237
        ],
        "renderVertexCount": 5892,
        "uploadVertexCount": 2544,
        "uploadNaiveVertexCount": 2544
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 60,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1380
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 63,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1155
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 408,
        "vertices": 408,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9384
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1440,
        "vertices": 2013,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 42861
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "initialShadingGroup",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert2SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert3SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert5SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 245565,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 159422,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 250181,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "512x1024",
        "size": 537763,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x1024",
        "size": 198078,
        "gpuSize": 2796204
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -2.18683,
          -0.02882,
          -2.93662
        ],
        "bboxMax": [
          2.85468,
          12.36719,
          1.94237
        ],
        "renderVertexCount": 5244,
        "uploadVertexCount": 2393,
        "uploadNaiveVertexCount": 2393
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 60,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 1380
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 56,
        "vertices": 63,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 1155
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 408,
        "vertices": 408,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 9384
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1224,
        "vertices": 1862,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32"
        ],
        "instances": 1,
        "size": 38998
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "initialShadingGroup",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert2SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert3SG",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "lambert5SG",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 109412,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 73122,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 114328,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x1024",
        "size": 247284,
        "gpuSize": 2796204
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x1024",
        "size": 198078,
        "gpuSize": 2796204
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/spruce_trees.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -47.50572,
          -2.39971,
          -21.38507
        ],
        "bboxMax": [
          20.99537,
          59.73003,
          19.72299
        ],
        "renderVertexCount": 5520,
        "uploadVertexCount": 3554,
        "uploadNaiveVertexCount": 3554
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 12,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 192
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 12,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 192
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 220,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 4312
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 51,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 801
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 51,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 801
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 948
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_84",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_85",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "big_branch_1",
        "instances": 13,
        "textures": [
          "baseColorTexture",
          "specularTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "big_branch_2",
        "instances": 13,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "Mat_tree_trunk",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "average_branch_1",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "average_branch_2",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "small_branch_1",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "small_branch_2",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "dry_branch",
        "instances": 11,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 351610,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "specularTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 117377,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 351989,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 317632,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 95836,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 320300,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 306181,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 345621,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x512",
        "size": 225960,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x512",
        "size": 194314,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x128",
        "size": 23584,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -47.50572,
          -2.39971,
          -21.38507
        ],
        "bboxMax": [
          20.99537,
          59.73003,
          19.72299
        ],
        "renderVertexCount": 5418,
        "uploadVertexCount": 3528,
        "uploadNaiveVertexCount": 3528
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 12,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 192
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 6,
        "vertices": 12,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 192
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 186,
        "vertices": 150,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TANGENT:i8_norm",
          "TEXCOORD_0:u16_norm",
          "TEXCOORD_1:u16_norm",
          "TEXCOORD_2:u16_norm",
          "TEXCOORD_3:u16_norm"
        ],
        "instances": 1,
        "size": 3666
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 51,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 801
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_17",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 51,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 801
      },
      {
        "name": "Object_18",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_19",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_20",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_21",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_22",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_23",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_24",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_25",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 23,
        "vertices": 49,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 775
      },
      {
        "name": "Object_26",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 27,
        "vertices": 61,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 955
      },
      {
        "name": "Object_27",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_28",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_29",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_30",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_31",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_32",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_33",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_34",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_35",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_36",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 60,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 948
      },
      {
        "name": "Object_37",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_38",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_39",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_40",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_41",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_42",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_43",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_44",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_45",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_46",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_47",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_48",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_49",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 21,
        "vertices": 41,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 659
      },
      {
        "name": "Object_50",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 28,
        "vertices": 58,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 922
      },
      {
        "name": "Object_51",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_52",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_53",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_54",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_55",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_56",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_57",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_58",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_59",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_60",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_61",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_62",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_63",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_64",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_65",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_66",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_67",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_68",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_69",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_70",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_71",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_72",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_73",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_74",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_75",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_76",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_77",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_78",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_79",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_80",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_81",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_82",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_83",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_84",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      },
      {
        "name": "Object_85",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 12,
        "vertices": 24,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 384
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "big_branch_1",
        "instances": 13,
        "textures": [
          "baseColorTexture",
          "specularTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "big_branch_2",
        "instances": 13,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "Mat_tree_trunk",
        "instances": 1,
        "textures": [
          "baseColorTexture",
          "normalTexture",
          "metallicRoughnessTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "average_branch_1",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "average_branch_2",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "small_branch_1",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "small_branch_2",
        "instances": 12,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      },
      {
        "name": "dry_branch",
        "instances": 11,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 133104,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "specularTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "512x512",
        "size": 117377,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 129568,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 55512,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "metallicRoughnessTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 95836,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "normalTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "1024x1024",
        "size": 320300,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 107126,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "512x512",
        "size": 129402,
        "gpuSize": 1398100
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x512",
        "size": 80208,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x512",
        "size": 70550,
        "gpuSize": 699052
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x128",
        "size": 10398,
        "gpuSize": 174764
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/tree.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          197.23106,
          34.92038,
          -0.1127
        ],
        "bboxMax": [
          200.02241,
          39.06948,
          3.01742
        ],
        "renderVertexCount": 62265,
        "uploadVertexCount": 32872,
        "uploadNaiveVertexCount": 32872
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2015,
        "vertices": 3165,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 53235
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2128,
        "vertices": 3068,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 52652
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 288,
        "vertices": 576,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 9216
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2631,
        "vertices": 4128,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 69450
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2233,
        "vertices": 3391,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 57481
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 147,
        "vertices": 275,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4457
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 69,
        "vertices": 177,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2715
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 164,
        "vertices": 314,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5066
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 133,
        "vertices": 192,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3294
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 207,
        "vertices": 328,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5506
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 76,
        "vertices": 172,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2692
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3911,
        "vertices": 6212,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 104222
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1061,
        "vertices": 1802,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 29792
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 232,
        "vertices": 513,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8061
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1077,
        "vertices": 1487,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 25793
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1679,
        "vertices": 3018,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 49308
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2704,
        "vertices": 4054,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 68926
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Mat_100",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_101",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_102",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_103",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_104",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_105",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_106",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_107",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_108",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_109",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_110",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_112",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_113",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_114",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_97",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_98",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_99",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 848251,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 993566,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 630468,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 932063,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 981573,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 548833,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 385576,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 848887,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 1077293,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 971214,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 630426,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 946309,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 941242,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 400618,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 852032,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 785919,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/jpeg",
        "compression": "",
        "resolution": "1024x1024",
        "size": 817488,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          197.23106,
          34.92038,
          -0.1127
        ],
        "bboxMax": [
          200.05152,
          39.06948,
          3.01742
        ],
        "renderVertexCount": 59688,
        "uploadVertexCount": 31893,
        "uploadNaiveVertexCount": 31893
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Object_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1917,
        "vertices": 3061,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 51295
      },
      {
        "name": "Object_1",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2018,
        "vertices": 2958,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 50562
      },
      {
        "name": "Object_2",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 275,
        "vertices": 561,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8943
      },
      {
        "name": "Object_3",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2516,
        "vertices": 3998,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 67070
      },
      {
        "name": "Object_4",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2150,
        "vertices": 3306,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 55878
      },
      {
        "name": "Object_5",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 142,
        "vertices": 270,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4362
      },
      {
        "name": "Object_6",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 68,
        "vertices": 176,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2696
      },
      {
        "name": "Object_7",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 159,
        "vertices": 305,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 4919
      },
      {
        "name": "Object_8",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 132,
        "vertices": 191,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 3275
      },
      {
        "name": "Object_9",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 195,
        "vertices": 314,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 5252
      },
      {
        "name": "Object_10",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 75,
        "vertices": 171,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 2673
      },
      {
        "name": "Object_11",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 3756,
        "vertices": 6044,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 101108
      },
      {
        "name": "Object_12",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1042,
        "vertices": 1783,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 29431
      },
      {
        "name": "Object_13",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 230,
        "vertices": 511,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 8023
      },
      {
        "name": "Object_14",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1020,
        "vertices": 1422,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 24606
      },
      {
        "name": "Object_15",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 1599,
        "vertices": 2881,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 47047
      },
      {
        "name": "Object_16",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 2602,
        "vertices": 3941,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:u16_norm"
        ],
        "instances": 1,
        "size": 66845
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Mat_100",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_101",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_102",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_103",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_104",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_105",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_106",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_107",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_108",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_109",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_110",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_112",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_113",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_114",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_97",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_98",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      },
      {
        "name": "Mat_99",
        "instances": 1,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "OPAQUE",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 373662,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 437286,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 281164,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 404828,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 431820,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 317388,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 213816,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 360048,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 470136,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 447954,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 365512,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 415564,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 425776,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 225086,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 352726,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 342614,
        "gpuSize": 5592404
      },
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "1024x1024",
        "size": 357372,
        "gpuSize": 5592404
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

## env/trees/tree_low_poly_lowpoly.glb

### Source geometry and texture statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -5.53041,
          0,
          -2.60767
        ],
        "bboxMax": [
          5.20258,
          8.99427,
          2.60767
        ],
        "renderVertexCount": 4887,
        "uploadVertexCount": 2047,
        "uploadNaiveVertexCount": 2047
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Tree 1_Tree 1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 816,
        "vertices": 1183,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 29739
      },
      {
        "name": "Tree 2_Tree 1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 813,
        "vertices": 864,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 23022
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Tree_1",
        "instances": 2,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/png",
        "compression": "",
        "resolution": "256x256",
        "size": 67936,
        "gpuSize": 349524
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```

### Optimized output statistics

```text
{
  "scenes": {
    "properties": [
      {
        "name": "Sketchfab_Scene",
        "rootName": "Sketchfab_model",
        "bboxMin": [
          -5.53041,
          0,
          -2.60767
        ],
        "bboxMax": [
          5.20258,
          8.99427,
          2.60767
        ],
        "renderVertexCount": 4425,
        "uploadVertexCount": 1943,
        "uploadNaiveVertexCount": 1943
      }
    ]
  },
  "meshes": {
    "properties": [
      {
        "name": "Tree 1_Tree 1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 784,
        "vertices": 1157,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 29001
      },
      {
        "name": "Tree 2_Tree 1_0",
        "mode": [
          "TRIANGLES"
        ],
        "meshPrimitives": 1,
        "glPrimitives": 691,
        "vertices": 786,
        "indices": [
          "u16"
        ],
        "attributes": [
          "NORMAL:i8_norm",
          "POSITION:i16_norm",
          "TEXCOORD_0:f32",
          "TEXCOORD_1:u16_norm"
        ],
        "instances": 1,
        "size": 20652
      }
    ]
  },
  "materials": {
    "properties": [
      {
        "name": "Tree_1",
        "instances": 2,
        "textures": [
          "baseColorTexture"
        ],
        "alphaMode": "BLEND",
        "doubleSided": true
      }
    ]
  },
  "textures": {
    "properties": [
      {
        "name": "",
        "uri": "",
        "slots": [
          "baseColorTexture"
        ],
        "instances": 1,
        "mimeType": "image/webp",
        "compression": "",
        "resolution": "256x256",
        "size": 28146,
        "gpuSize": 349524
      }
    ]
  },
  "animations": {
    "properties": []
  }
}
```
