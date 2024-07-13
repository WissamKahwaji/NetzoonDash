import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const NAV_LINKS = [
  { name: "categories", href: "/categories", icon: CategoryIcon },
  { name: "departments", href: "/departments", icon: LayersIcon },
  { name: "users", href: "/users", icon: GroupIcon },
  { name: "services", href: "/services", icon: HomeRepairServiceIcon },
  { name: "deals", href: "/deals", icon: LocalOfferIcon },
  { name: "vehicles", href: "/vehicles", icon: DirectionsCarIcon },
  { name: "Ads", href: "/ads", icon: AdsClickRoundedIcon },
  { name: "news", href: "/news", icon: NewspaperRoundedIcon },
  {
    name: "notifications",
    href: "/notifications",
    icon: NotificationsRoundedIcon,
  },
  { name: "orders", href: "/orders", icon: StoreRoundedIcon },
  { name: "sliders", href: "/sliders", icon: ViewCarouselRoundedIcon },
  { name: "settings", href: "/settings", icon: SettingsRoundedIcon },
];

const USER_TYPE = {
  LOCAL_COMPANY: "local_company",
  USER: "user",
  FREEZONE: "freezone",
  FACTORY: "factory",
  CAR: "car",
  PLANES: "planes",
  SEA_COMPANIES: "sea_companies",
  NEWS_AGENCY: "news_agency",
  REAL_ESTATE: "real_estate",
  TRADER: "trader",
  DELIVERY_COMPANY: "delivery_company",
};

export { NAV_LINKS, USER_TYPE };
