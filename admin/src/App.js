import React from "react";
import {
  DownOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  SolutionOutlined,
  PlayCircleOutlined, // thêm mới
  CalendarOutlined, // thêm mới
  HomeOutlined, // thêm mới
  ReadOutlined, // thêm mới
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  ConfigProvider,
} from "antd";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { toast } from "react-toastify";
import useAuthStore from "./store/useAuthStore";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: 1,
    icon: React.createElement(VideoCameraOutlined), // Cinema
    label: "Rạp chiếu phim", // Dịch "Cinema"
  },
  {
    key: 2,
    icon: React.createElement(AppstoreOutlined), // Brands
    label: "Thương hiệu", // Dịch "Brands"
  },
  {
    key: 3,
    icon: React.createElement(PlayCircleOutlined), // Movies
    label: "Phim", // Dịch "Movies"
  },
  {
    key: 4,
    icon: React.createElement(CalendarOutlined), // Schedules
    label: "Lịch chiếu", // Dịch "Schedules"
  },
  {
    key: 5,
    icon: React.createElement(HomeOutlined), // Rooms
    label: "Phòng chiếu", // Dịch "Rooms"
  },
  {
    key: 6,
    icon: React.createElement(ReadOutlined), // Blogs
    label: "Blog",
  },
];

const menuProps = [
  {
    key: "signout",
    label: "Đăng xuất",
    icon: React.createElement(LogoutOutlined),
    danger: true,
  },
];

const App = () => {
  const nav = useNavigate();
  const [isShowLogo, setIsShowLogo] = React.useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, logout } = useAuthStore();

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      logout();
      toast.success("Log out successfully!");
      nav("/login");
      // Add your sign out logic here
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#85D94F", // Green color
        },
      }}>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="50px"
          onBreakpoint={(broken) => {
            setIsShowLogo(!broken);
          }}
          onCollapse={(collapsed, type) => {
            setIsShowLogo(!collapsed);
          }}>
          {isShowLogo && <div></div>}
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={items.map((item) => ({
              ...item,
              icon: React.cloneElement(item.icon, {
                style: { fontSize: "18px" },
              }),
              label: <span style={{ fontSize: "16px" }}>{item.label}</span>,
            }))}
            onClick={(e) => {
              switch (e.key) {
                case "1":
                  nav("/");
                  break;
                case "2":
                  nav("/brands");
                  break;
                case "3":
                  nav("/movies");
                  break;
                case "4":
                  nav("/schedules");
                  break;
                case "5":
                  nav("/rooms");
                  break;
                case "6":
                  nav("/blogs");
                  break;
                default:
                  break;
              }
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}>
            <Row justify="space-between">
              <span
                style={{
                  color: "black",
                  fontSize: "1rem",
                  marginLeft: "1rem",
                  fontWeight: "bold",
                }}>
                Quản trị viên {/* Dịch "Admin" */}
              </span>
              <Dropdown
                overlay={<Menu onClick={handleMenuClick} items={menuProps} />}>
                <div>
                  <Button>
                    <Space>
                      <Avatar size="small" icon={<UserOutlined />} />
                      {isShowLogo && <span>{user?.email}</span>}
                      <DownOutlined />
                    </Space>
                  </Button>
                </div>
              </Dropdown>
            </Row>
          </Header>
          <Content
            style={{
              margin: "10px  10px 0",
            }}>
            <div
              style={{
                padding: 24,
                minHeight: "90vh",
                background: "white",
                borderRadius: borderRadiusLG,
              }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
