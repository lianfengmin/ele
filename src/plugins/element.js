import Vue from 'vue'
import {
    Form,
    FormItem,
    Input,
    Button,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Step,
    Steps,
    CheckboxGroup,
    Checkbox,
    Upload,
    TimelineItem,
    Timeline
} from "element-ui"

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message



Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Upload)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
