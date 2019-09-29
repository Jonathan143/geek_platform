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
  MenuItemGroup,
  Submenu,
  Tabs,
  TabPane,
  Tag,
  Table,
  TableColumn,
  Select,
  Option,
  Avatar,
  Popover,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Card,
  Image,
  Col,
  Row,
  Link,
  Tooltip,
  Form,
  FormItem,
  Divider,
  Container,
  Header,
  Main,
  Aside,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  InfiniteScroll,
  Radio,
  RadioGroup,
  Switch
} from 'element-ui'
import '../theme/element-variables.scss'
import 'element-ui/lib/theme-chalk/base.css'

Vue.use(Button)
  .use(Loading.directive)
  .use(Dialog)
  .use(Loading)
  .use(Icon)
  .use(Input)
  .use(Upload)
  .use(Menu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Submenu)
  .use(Tabs)
  .use(TabPane)
  .use(Tag)
  .use(Table)
  .use(TableColumn)
  .use(Select)
  .use(Option)
  .use(Avatar)
  .use(Popover)
  .use(Dropdown)
  .use(DropdownItem)
  .use(DropdownMenu)
  .use(Card)
  .use(Image)
  .use(Col)
  .use(Row)
  .use(Link)
  .use(Tooltip)
  .use(Form)
  .use(FormItem)
  .use(Divider)
  .use(Container)
  .use(Header)
  .use(Main)
  .use(Aside)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Checkbox)
  .use(InfiniteScroll)
  .use(Radio)
  .use(RadioGroup)
  .use(Switch)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
