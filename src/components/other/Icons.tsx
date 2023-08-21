import {
  AiFillCaretUp,
  AiFillPlusCircle,
  AiOutlineEye,
  AiOutlineLeft,
  AiOutlineRight
} from "react-icons/ai";
import { BiMinusCircle } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoIosArrowDown, IoMdCalendar } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdAttachFile,
  MdDone,
  MdKeyboardArrowDown,
  MdMoreVert,
  MdOutlineDelete,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdOutlinePerson,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdTune,
  MdUnfoldMore
} from "react-icons/md";
import { RiArrowDownSLine, RiMap2Fill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
export interface IconProps {
  name: string;
  className?: string;
  color?: string;
  height?: string;
  width?: string;
  fun?: () => void;
}

const Icon = ({ name, className, color }: IconProps) => {
  switch (name) {
    case "filter":
      return <MdTune className={className} />;
    case "delete":
      return <BiMinusCircle className={className} />;
    case "calendar":
      return <IoMdCalendar className={className} />;
    case "arrowDown":
      return <RiArrowDownSLine className={className} />;
    case "arrowUp":
      return <AiFillCaretUp className={className} />;
    case "close":
      return <IoCloseOutline className={className} />;
    case "map":
      return <RiMap2Fill className={className} />;
    case "back":
      return <MdArrowBack className={className} />;
    case "backMobile":
      return <MdArrowBack className={className} />;
    case "dropdownArrow":
      return <MdKeyboardArrowDown className={className} />;
    case "add":
      return <AiFillPlusCircle className={className} />;
    case "more":
      return <MdMoreVert className={className} />;
    case "menu":
      return <TiThMenu className={className} />;
    case "time":
      return <FiClock className={className} />;
    case "down":
      return <IoIosArrowDown className={className} />;
    case "attachment":
      return <MdAttachFile className={className} />;
    case "active":
      return <MdDone className={className} />;
    case "burger":
      return <GiHamburgerMenu className={className} />;
    case "forward":
      return <MdArrowForwardIos className={className} />;
    case "backward":
      return <MdArrowBackIos className={className} />;
    case "visibleOn":
      return <MdOutlineVisibility className={className} />;
    case "visibleOff":
      return <MdOutlineVisibilityOff className={className} />;
    case "returnArrow":
      return <HiOutlineArrowNarrowLeft className={className} />;
    case "person":
      return <MdOutlinePerson className={className} />;
    case "showMore":
      return <MdUnfoldMore className={className} />;
    case "remove":
      return <FaTrash className={className} />;
    case "leftArrow":
      return <AiOutlineLeft className={className} />;
    case "rightArrow":
      return <AiOutlineRight className={className} />;
    case "deleteItem":
      return <MdOutlineDelete className={className} />;
    case "eye":
      return <AiOutlineEye className={className} />;
    case "fullscreen":
      return <MdOutlineFullscreen className={className} />;
    case "exitFullScreen":
      return <MdOutlineFullscreenExit className={className} />;

    default:
      return null;
  }
};

export default Icon;
