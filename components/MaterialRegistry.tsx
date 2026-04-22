"use client";

import { useEffect } from 'react';

export default function MaterialRegistry() {
  useEffect(() => {
    import('@material/web/button/filled-button.js');
    import('@material/web/button/filled-tonal-button.js');
    import('@material/web/button/outlined-button.js');
    import('@material/web/button/text-button.js');
    import('@material/web/fab/fab.js');
    import('@material/web/icon/icon.js');
    import('@material/web/iconbutton/icon-button.js');
    import('@material/web/menu/menu.js');
    import('@material/web/menu/menu-item.js');
    import('@material/web/elevation/elevation.js');
    
    // New components from MD3 Catalog
    import('@material/web/tabs/tabs.js');
    import('@material/web/tabs/primary-tab.js');
    import('@material/web/list/list.js');
    import('@material/web/list/list-item.js');
    import('@material/web/slider/slider.js');
    import('@material/web/switch/switch.js');
    import('@material/web/checkbox/checkbox.js');
    import('@material/web/chips/chip-set.js');
    import('@material/web/chips/filter-chip.js');
  }, []);

  return null;
}
