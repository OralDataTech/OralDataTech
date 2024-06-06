import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import BadgeIcon from "@mui/icons-material/Badge";
import BookIcon from "@mui/icons-material/Book";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AirlineSeatIndividualSuiteRoundedIcon from "@mui/icons-material/AirlineSeatIndividualSuiteRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import BrandingWatermarkRoundedIcon from "@mui/icons-material/BrandingWatermarkRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import PercentIcon from "@mui/icons-material/Percent";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import HelpIcon from "@mui/icons-material/Help";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import { User } from "../types/User";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

export default function useIcons() {
  const icons = {
    HelpIcon,
    ArticleRoundedIcon,
    EscalatorWarningIcon,
    HistoryToggleOffRoundedIcon,
    SchemaRoundedIcon,
    AddCircleRoundedIcon,
    ErrorRoundedIcon,
    TableChartRoundedIcon,
    VisibilityOffRoundedIcon,
    VisibilityRoundedIcon,
    DeleteForeverRoundedIcon,
    DriveFileRenameOutlineRoundedIcon,
    BedtimeIcon,
    BadgeRoundedIcon,
    WarningRoundedIcon,
    VerifiedRoundedIcon,
    CreateRoundedIcon,
    NotificationsIcon,
    AirlineSeatIndividualSuiteRoundedIcon,
    FemaleRoundedIcon,
    MaleRoundedIcon,
    AdminPanelSettingsIcon,
    EmailRoundedIcon,
    PersonRoundedIcon,
    FolderOpenRoundedIcon,
    ArrowDownward,
    ExpandMoreIcon,
    PercentIcon,
    HealthAndSafetyRoundedIcon,
    CancelRoundedIcon,
    PsychologyAltIcon,
    HomeRoundedIcon,
    PersonOutlinedIcon,
    AccessibilityNewOutlinedIcon,
    FemaleOutlinedIcon,
    MaleOutlinedIcon,
    LogoutIcon,
    PasswordIcon,
    BadgeIcon,
    BookIcon,
    GroupsIcon,
    MedicalInformationRoundedIcon,
    ArrowBackIosIcon,
    CloseRoundedIcon,
    CalendarMonthIcon,
    MoreVertIcon,
    AddRoundedIcon,
    CheckCircleRoundedIcon,
    LocalPhoneRoundedIcon,
    BrandingWatermarkRoundedIcon,
    CheckRoundedIcon,
  };

  const verifyPhotoPath = (user: User) => {
    if (!user.photo) {
      if (user.gender === "Masculino") {
        return "male-avatar.webp";
      } else if (user.gender === "Feminino") {
        return "female-avatar.png";
      } else {
        return "default-avatar.png";
      }
    } else {
      return user.photo;
    }
  };

  const verifyPatientPhotoPath = (gender: string) => {
    if (gender === "Masculino") {
      return "male-avatar.webp";
    } else if (gender === "Feminino") {
      return "female-avatar.png";
    } else {
      return "default-avatar.png";
    }
  };

  return {
    ...icons,
    verifyPhotoPath,
    verifyPatientPhotoPath,
  };
}
