// 创建 el-menu-item
export function elMenuItem(createElement, menu) {
  return createElement('el-menu-item', { props: { index: menu.route.name } }, [
    ...(menu.fontClass
      ? [
          createElement('d2-icon', {
            props: { name: menu.fontClass }
          })
        ]
      : []),
    ...(!menu.fontClass && !menu.icon
      ? [createElement('i', { attrs: { class: 'fa fa-file-o' } })]
      : []),
    ...(menu.icon
      ? [createElement('d2-icon-svg', { props: { name: menu.icon } })]
      : []),
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
  ])
}

// 创建 el-submenu
export function elSubmenu(createElement, menu) {
  return createElement('el-submenu', { props: { index: menu.route.name } }, [
    ...(menu.fontClass
      ? [
          createElement('d2-icon', {
            slot: 'title',
            props: { name: menu.fontClass }
          })
        ]
      : []),
    ...(!menu.fontClass && !menu.icon
      ? [createElement('i', { attrs: { class: 'fa fa-file-o' } })]
      : []),
    ...(menu.icon
      ? [
          createElement('d2-icon-svg', {
            slot: 'title',
            props: { name: menu.icon }
          })
        ]
      : []),
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单'),
    ...menu.children.map((child, childIndex) =>
      (child.children === undefined || !child.children.length
        ? elMenuItem
        : elSubmenu
      ).call(this, createElement, child)
    )
  ])
}
