// This file centralizes the detailed text content for building the AI prompt.

export const FIXED_VS_NON_FIXED_PARTS = `
**1. Fixed Parts**
- **Definition**: Core structural elements of the home. Permanently attached and usually not replaced unless there's major construction.
- **Examples**:
  - Windows & window frames (glass panels, grills, shutters)
  - Doors & door frames (main door, interior doors, sliding doors)
  - Walls (structural, partition, fixed wall dividers)
  - Structural ceiling slab (permanent overhead structure)
  - Staircases (steps, railing, balustrades)
  - Fireplace (core masonry/firebox)
  - Kitchen islands / peninsulas (structural base with plumbing/electrical)
  - Kitchen sink basin (built-in)
  - Bathroom fittings (toilet, bathtub, fixed sink basins, shower enclosures)
  - Utility sink / laundry basin
  - Structural pillars & beams
  - In-built niches (alcoves, wall recesses)
  - Built-in carcasses (wardrobes, cabinetry shells)
  - Balconies & terraces (structural slab & railing base)

**2. Non-Fixed Parts**
- **Definition**: All items, finishes, and fixtures that can be changed, upgraded, or styled during interior design projects. Includes both easily movable objects and installed fixtures that are part of design choices.
- **Examples**:
  **1. Surfaces & Finishes**
  - Flooring materials (tiles, wood planks, vinyl, carpet rolls)
  - Wall finishes (paint, wallpaper, wall panels, cladding)
  - Ceiling finishes (paint, wallpaper, decorative panels, faux beams, acoustic panels, ceiling tiles)
  - Kitchen & bathroom backsplashes (tiles, stone, glass, metal)
  - Cabinet finishes (doors, shutters, laminates, veneers)
  - Hardware (handles, knobs, pulls, locks for doors/cabinets/windows)
  - Kitchen island cladding & countertop finishes
  - Fireplace cladding & mantels
  - Balcony/terrace flooring, railing finishes, wall finishes

  **2. Fixtures (Design-relevant)**
  - Ceiling fans
  - Ceiling light fixtures (chandeliers, pendants, flush mounts)
  - Wall-mounted sconces / fixed wall lights
  - Switchboards & sockets (styling finishes, smart switches)
  - False ceiling frameworks (POP, gypsum boards, tray/coffered layouts)
  - Recessed lighting (spotlights, cove lights, LED strips)
  - Air-conditioning units (split ACs, vents, duct covers)
  - Heaters / radiators (designer finishes)
  - Water heaters (visible models with design impact)
  - Projectors, retractable screens
  - Exhaust fans (designer vent covers)
  - Ceiling/in-wall speaker systems (design-integrated)
  - Faucets, taps, showerheads, spouts
  - Kitchen chimney / range hood (designer finishes)
  - Built-in water purifiers (visible panels)
  - Intercom systems, smart home panels

  **3. Furniture**
  - Beds, sofas, chairs, stools, ottomans
  - Dining tables, coffee tables, side tables, consoles
  - TV stands, media units
  - Freestanding wardrobes, cupboards, dressers, bookcases
  - Shelves (non-fixed)
  - Desks & workstations
  - Outdoor furniture (for balconies/terraces)
  - Portable room dividers, folding screens

  **4. Soft Furnishings**
  - Rugs, carpets, runners
  - Curtains, drapes, blinds (removable)
  - Cushions, throws, quilts, comforters
  - Bedding (mattresses, sheets, blankets, pillows)
  - Tablecloths, runners, placemats

  **5. Decor**
  - Wall art, paintings, posters, tapestries
  - Mirrors (freestanding or hook-hung)
  - Clocks
  - Sculptures, decorative bowls, trays
  - Candles & candle holders
  - Vases & artificial flowers
  - Picture frames, photo albums
  - Seasonal décor (Diwali lamps, Christmas tree, holiday lights)

  **6. Lighting (Portable)**
  - Table lamps
  - Floor lamps
  - String lights
  - Portable lanterns
  - Battery-operated lamps

  **7. Electronics & Appliances**
  - TVs (if not wall-mounted)
  - Portable speakers, smart hubs (Alexa, Google Home)
  - Laptops, tablets, chargers
  - Small appliances (microwave, toaster, kettle, coffee machine, mixer)
  - Portable fans & heaters
  - Vacuum cleaners, robot vacuums
  - Air purifiers, humidifiers, dehumidifiers
  - Gaming consoles, projectors (if not ceiling-mounted)
  - Portable exercise gear (treadmills, bikes, dumbbells, yoga mats)
  - Musical instruments (piano, guitar, drums)

  **8. Plants & Accessories**
  - Indoor plants in pots
  - Planters (ceramic, plastic, terracotta, baskets)
  - Artificial plants & flowers
  - Water fountains (tabletop, portable)

  **9. Miscellaneous**
  - Storage baskets, bins, boxes
  - Laundry hampers
  - Shoe racks (movable)
  - Coat racks & stands
  - Pet furniture (beds, crates, cat trees)
  - Kids' toys, play tents, activity tables
  - Office accessories (desk organizers, ergonomic chairs)
`;

export const LIGHTING_GUIDE = `
**Ground Rule**: Base lighting hue is determined by the chosen style and never changes with mood. Mood only changes how much light and how it spreads, not the color.

**Intensity (Low / Medium / High)**
- **What it means**: How bright the room appears while keeping the same base hue.
- **Low**: dim, intimate, calmer shadows.
- **Medium**: balanced everyday brightness; comfortable clarity with some depth.
- **High**: bright, clear, energetic; minimal shadow.

**Feel (Soft / Neutral / Crisp)**
- **What it means**: The character of the light spread and shadow edges while keeping the same base hue.
- **Soft**: diffused, gentle, low-glare; edges blurred, highlights subdued.
- **Neutral**: even, natural, unobtrusive; edges moderate.
- **Crisp**: defined, directional; edges sharper, textures more pronounced.
`;

export const MOOD_GUIDES = {
  'Relaxed': `
- **Description**: Easygoing, breezy, casual.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Soft (diffused, gentle, low-glare; edges blurred, highlights subdued).
`,
  'Cozy': `
- **Description**: Snug, warm, comforting.
- **Intensity**: Low (dim, intimate, calmer shadows).
- **Feel**: Soft (diffused, gentle, low-glare; edges blurred, highlights subdued).
`,
  'Bright': `
- **Description**: Light-filled, fresh, uplifting.
- **Intensity**: High (bright, clear, energetic; minimal shadow).
- **Feel**: Neutral (even, natural, unobtrusive; edges moderate).
`,
  'Elegant': `
- **Description**: Graceful, polished, refined.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Soft (diffused, gentle, low-glare; edges blurred, highlights subdued).
`,
  'Bold': `
- **Description**: Strong, dramatic, attention-grabbing.
- **Intensity**: High (bright, clear, energetic; minimal shadow).
- **Feel**: Crisp (defined, directional; edges sharper, textures more pronounced).
`,
  'Playful': `
- **Description**: Youthful, creative, fun.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Neutral (even, natural, unobtrusive; edges moderate).
`,
  'Minimal': `
- **Description**: Simple, uncluttered, clean.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Neutral (even, natural, unobtrusive; edges moderate).
`,
  'Natural': `
- **Description**: Earthy, grounded, organic.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Soft (diffused, gentle, low-glare; edges blurred, highlights subdued).
`,
  'Moody': `
- **Description**: Dark, intimate, dramatic.
- **Intensity**: Low (dim, intimate, calmer shadows).
- **Feel**: Crisp (defined, directional; edges sharper, textures more pronounced).
`,
  'Classic': `
- **Description**: Timeless, structured, traditional.
- **Intensity**: Medium (balanced everyday brightness; comfortable clarity with some depth).
- **Feel**: Soft (diffused, gentle, low-glare; edges blurred, highlights subdued).
`,
};

export const STYLE_GUIDES = {
'Modern': `
**Furniture**: Low, rectilinear silhouettes with flat planes and smooth edges; ornamentation absent. Sofas and chairs with tight upholstery, slim arms, and thin legs in chrome, matte black, or simple wood. Coffee/side tables as slim rectangles or true circles with geometric bases in clear glass, honed stone, or linear-grain veneer. Storage as slab-front credenzas.
**Décor & Accessories**: Artwork is abstract or geometric at a large scale. Objects are pure forms like spheres, cylinders, cubes. Textiles are smooth and plain (linen, wool, leather). Rugs are low-pile or flatweave in solids or micro-stripes.
**Color Palette**: Base of crisp neutrals (white, cream, beige, light gray). Contrast defined by black, graphite, or steel. Wood tones are restrained (walnut, oak). Metals are primarily chrome, stainless steel, and matte black. Accent color in focused, solid hits like saturated red, yellow, or blue.
**Materials & Textures**: Core materials are clear glass, chrome/stainless steel, concrete, honed stone, and linear-grain veneers. Surface sheen is matte to satin.
**Lighting Design**: Ambient light from recessed downlights or slim track systems. Pendants are geometric or sculptural. Floor/table lamps are simple forms like arcs, domes, or cylinders.
`,
'Transitional': `
**Furniture**: Tailored silhouettes blending straight lines with softened curves. Sofas with track or gently rolled arms. Chairs include petite wings or barrel forms. Coffee/side tables in Parsons, pedestal, or soft oval forms. Hardware is simple and refined.
**Décor & Accessories**: Artwork includes soft abstracts, serene landscapes, monochrome photography. Rugs are low to medium pile with tone-on-tone trellis or bordered solids. Textiles include linen, cotton, chenille, and soft velvet.
**Color Palette**: Base of warm whites, ivory, cream, soft gray, greige. Contrast through ink navy, slate, charcoal, or cognac leather. Woods in even medium stains (walnut, espresso). Metals are coordinated in brushed nickel, antique brass, or oil-rubbed bronze.
**Materials & Textures**: Wood with visible, even grain. Stone and composites like marble, limestone, quartz with honed or soft polish. Fabrics are soft and tailored.
**Lighting Design**: Chandeliers with drum, lantern, or simple tiered frames. Pendants in metal, glass, or fabric. Sconces with fabric or metal shades.
`,
'Contemporary': `
**Furniture**: Profiles blend crisp planes with softened corners; silhouettes are streamlined and current. Sofas with slim track or gently sloped arms. Sectionals include modular and curved corner pieces. Coffee/side tables as waterfall, plinth, or drum forms.
**Décor & Accessories**: Artwork is large-scale abstracts, color-field washes, or gestural ink. Rugs are low to medium pile in solids or soft geometrics. Textiles emphasize tactility—bouclé, wool blends, linen. Objects include oversized ceramics, matte stoneware, or smoked glass vessels.
**Color Palette**: Base in warm neutrals (soft white, cream, sand, putty). Contrast through graphite and matte black. Accents in muted mineral and earth hues (eucalyptus, olive, clay, terracotta). Metals are coordinated: matte black, burnished brass/champagne, or soft nickel.
**Materials & Textures**: Core materials are natural oak/ash/walnut, travertine, limestone, warm concrete, plaster, clear/smoked glass, matte metals. Textures are tactile but refined.
**Lighting Design**: Ambient lighting from recessed downlights or slim linear tracks. Pendants are sculptural or dome forms. Floor lamps are slim arcs or domed heads.
`,
'Scandinavian': `
**Furniture**: Silhouettes are light and slender with softened corners and clean planes. Sofas with straight or gently rounded arms and raised legs. Lounge chairs in bentwood, spindle-back, or leather sling forms. Coffee/side tables are simple rounds or ovals in light wood or pale stone. Heavy hardware is absent.
**Décor & Accessories**: Artwork is minimal: line drawings, calm abstracts. Rugs are flatweave wool or cotton in pale solids or fine stripes. Textiles include linen, cotton, wool, and felt, emphasizing layering and softness. Objects are matte stoneware, pale ceramics, turned wood bowls.
**Color Palette**: Foundation of soft white, chalk, cream, and pale gray. Warmth through light woods like oak, ash, birch. Accents are muted: powder blue, clay, blush, sage. Black appears as a thin line in frames or lamp stems. Metals are quiet and matte.
**Materials & Textures**: Core materials are light woods, wool, linen, cotton, felt, pale ceramics, clear glass, and matte blackened steel accents. Sheen is matte to low-sheen. Texture is soft and tactile.
**Lighting Design**: Ambient light is soft and even. Floor lamps are slim in wood or matte metal with linen or paper shades. Table lamps in mushroom or globe forms.
`,
'Moroccan': `
**Furniture**: Low seating dominates: bench-like sofas, daybeds, floor cushions. Poufs in leather with hand-stitched panels. Coffee tables are octagonal or round tray forms in hammered brass or carved cedar. Side tables with Moorish arches or lattice cutouts.
**Décor & Accessories**: Rugs are a signature feature: Beni Ourain trellis piles, flatweave kilims. Textiles include cactus silk and striped sabra. Art references zellige geometry and calligraphy. Objects include tagine-form vessels and shallow brass trays. Lanterns are common.
**Color Palette**: Foundation of sand, ivory, clay, cumin, warm taupe. Jewel notes like saffron, turmeric, indigo, cobalt, emerald, ruby. Metals are warm and aged—antique brass, burnished gold, hammered copper.
**Materials & Textures**: Tadelakt plaster, zellige tile, carved or inlaid wood, hammered brass/bronze, warm stone, and woven fibers. Textiles have hand-loomed irregularity.
**Lighting Design**: Lantern-inspired portables with pierced metal or colored glass. Table lamps in ceramic or metal with drum caps. Floor lamps as column or minaret silhouettes.
`,
'Industrial': `
**Furniture**: Forms are sturdy and engineered: straight lines, block profiles, visible joinery. Sofas are boxy in leather or heavy canvas. Lounge chairs reference workshop seating with sling leather or welded metal frames. Coffee/side tables resemble factory carts. Storage evokes lockers or flat files.
**Décor & Accessories**: Artwork references industry: black-and-white cityscapes, blueprints. Rugs are flatweave or low pile in heathered solids or simple stripes. Objects include wire baskets and metal bins. Mirrors have factory-pane or riveted frames. Textiles are rugged: wool, denim, canvas, leather.
**Color Palette**: Base grounded in charcoal, graphite, iron black, and smoke gray. Wood tones are weathered oak or ash. Metals dominate: blackened steel, aged iron, galvanized zinc. Accent color echoes workshop cues: signal red, safety orange, hazard yellow.
**Materials & Textures**: Primary materials are blackened steel, raw or sealed concrete, brick, galvanized metal, oiled oak/ash, leather. Finishes are matte to satin; patina and subtle wear are valued.
**Lighting Design**: Task-inspired portables with articulated arms and counterweights. Edison-style visible filament bulbs are a signature cue. Floor lamps in tripod surveyor or cantilever forms. Ambient light from linear tracks.
`,
'Mid-Century Modern': `
**Furniture**: Low, streamlined silhouettes on tapered or splayed legs in walnut or teak. Sofas with tight backs and bench cushions. Lounge chairs as molded plywood shells or spindle backs. Coffee/side tables in surfboard ovals or kidney shapes. Storage as long credenzas on pencil legs.
**Décor & Accessories**: Artwork is abstract geometry, color-field studies, or playful biomorphic forms. Iconic accents include sunburst clocks and sculptural turned-wood objects. Rugs are low pile or flatweave in heathered solids or small-scale geometrics. Textiles in tweed, bouclé, or basket weaves.
**Color Palette**: Base of warm woods (walnut, teak) against clean creams and soft grays. Period accents include mustard, ochre, olive, teal, paprika. Black lines sharpen profiles. Metals are brushed brass or matte black.
**Materials & Textures**: Core materials: walnut/teak veneer, molded plywood, leather, cane, cork, terrazzo, honed stone. Wood grain is expressed and book-matched.
**Lighting Design**: Floor lamps are tripod or arc with drum shades. Table lamps in ceramic gourd/hourglass or sculptural wood stems. Task lights with swivel heads and counterbalanced arms.
`,
'Coastal': `
**Furniture**: Light, airy silhouettes with softened corners and slim profiles. Sofas are often slipcovered in linen or cotton in white or sand. Lounge chairs in woven rattan or pale wood frames. Coffee/side tables in light oak, whitewashed pine, or driftwood tones.
**Décor & Accessories**: Artwork of seascapes, horizon abstracts, or palm botanicals. Rugs in natural fibers like jute or seagrass. Textiles in linen, cotton, and chambray with patterns like ticking or Breton stripes. Objects include white ceramic vases and sea-glass bottles.
**Color Palette**: Foundation is bright and clean: white, ivory, soft sand, driftwood gray. Blues define the signature: sky, powder, Capri. Sea-glass accents: aqua, misty green, pale teal. Warmth through pale woods and oat linens.
**Materials & Textures**: Core materials: light woods, rattan, cane, wicker, linen, cotton, jute, sea glass. Finishes are matte or weathered. Metals are soft-brushed.
**Lighting Design**: Table lamps in white ceramic or blue-glazed bodies with linen drum shades. Floor lamps are slim in pale wood or rattan. Pendants in woven rattan or cane.
`,
'Japandi': `
**Furniture**: Low, calm silhouettes with softly rounded edges; ornament absent. Sofas with tight upholstery on simple wood bases. Lounge chairs with gentle curves, paper-cord seats. Coffee/side tables as slim slabs in straight-grain wood or honed light stone.
**Décor & Accessories**: Artwork as ink-wash studies or single-stroke line drawings. Objects are handcrafted: stoneware vases, tea trays, carved wood bowls. Textiles in linen, cotton, wool with subtle patterns. Rugs are flatweave or low pile with tatami-inspired grids.
**Color Palette**: Foundation is warm-neutral: bone, ecru, oat, warm gray. Contrast through matte black or deep charcoal lines. Wood tones are pale to mid—oak, ash, birch. Accents are muted and natural: clay, sage gray, inky indigo.
**Materials & Textures**: Core materials: pale woods, honed light stone, smooth plaster, matte black metal, stoneware, linen, wool, paper-like diffusers. Values wabi-sabi character: handmade variation, visible joinery, patina.
**Lighting Design**: Ambient light is soft and even from recessed trims, concealed coves, or paper-lantern pendants. Task lighting in matte black or pale wood. Table/floor lamps with linen or opal-glass diffusers.
`,
'Bohemian': `
**Furniture**: Collected, relaxed silhouettes mixing straight frames with easy curves. Sofas in linen or velvet with generous cushions. Accent seating includes butterfly chairs, sling frames, or hanging chairs. Coffee tables are varied: carved teak slabs, vintage trunks, hammered-brass trays. Materials are natural and handmade.
**Décor & Accessories**: Rug layering is characteristic. Textiles mix global motifs—ikat, suzani, block print. Wall textiles and macramé hangings are common. Objects are handmade: terracotta, carved bowls, woven baskets. Plants are abundant and relaxed.
**Color Palette**: Foundation is warm and earthy: soft white, ivory, sand, clay. Accent richness from jewel tones: teal, turquoise, saffron, paprika, magenta. Woods are honey, teak, weathered tones. White walls often act as a calm backdrop.
**Materials & Textures**: Natural fibers (linen, cotton, wool), jute, sisal, rattan, cane, carved and weathered woods, terracotta, stoneware, hammered brass. Finishes are matte to softly burnished. Texture is layered and tactile.
**Lighting Design**: Ambient light is warm and layered from rattan pendants or fabric drums. Task lights with simple domed heads in warm brass or bronze. Table/floor lamps in ceramic or carved wood bodies with linen or jute shades.
`,
};