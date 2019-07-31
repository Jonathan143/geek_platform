import Vue from 'vue'
import {
  Button,
  Message,
  Loading,
  MessageBox,
  Notification,
  Dialog,
  Icon,
  Input,
  Upload,
  Menu,
  MenuItem,
  Submenu,
  Tabs,
  TabPane,
  Tag,
  Table,
  Select,
  Option,
  Avatar,
  Popover,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from 'element-ui'
import '../theme/element-variables.scss'

Vue.use(Button)
  .use(Loading.directive)
  .use(Dialog)
  .use(Loading)
  .use(Icon)
  .use(Input)
  .use(Upload)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Tabs)
  .use(TabPane)
  .use(Tag)
  .use(Table)
  .use(Select)
  .use(Option)
  .use(Avatar)
  .use(Popover)
  .use(Dropdown)
  .use(DropdownItem)
  .use(DropdownMenu)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
