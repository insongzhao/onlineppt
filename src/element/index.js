import {
  Pagination,
  Header,
  Aside,
  Main,
  Button,
  Container,
  Footer,
  Select,
  Option,
  OptionGroup,
  Input,
  Tree,
  Dialog,
  Card,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  DropdownMenu,
  Dropdown,
  DropdownItem,
  InputNumber,
  Message,
  Checkbox,
  ColorPicker,
  Progress
} from "element-ui";
const element = {
  install: function(Vue) {
    Vue.use(Pagination);
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Footer);
    Vue.use(Container);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Button);
    Vue.use(ColorPicker);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(Tree);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Card);
    Vue.use(DropdownMenu);
    Vue.use(Dropdown);
    Vue.use(DropdownItem);
    Vue.use(Checkbox);
    Vue.use(Progress);
    Vue.use(InputNumber);
    Vue.prototype.$message = Message;
  }
};
export default element;
