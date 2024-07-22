import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface LanguageButtonProps {
  className?: string;
  title?: string;
}

const LanguageButton = ({ className, title }: LanguageButtonProps) => {
  const { i18n } = useTranslation();
  const storedLanguage = localStorage.getItem("selectedLanguage");
  const [lang, setLang] = useState(
    storedLanguage || navigator.language.split("-")[0] || "en"
  ); // Default to 'en' if language is not available

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    document.body.dir = i18n.dir(lang);
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    setLang(lng);
    localStorage.setItem("selectedLanguage", lng);

    handleClose();
  };

  const langList = ["en", "ar"];

  return (
    <div className={className}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        <Typography color="white" variant="button">
          {title ? title : lang}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {langList.map(lng => (
          <MenuItem
            key={lng}
            onClick={() => changeLanguage(lng)}
            selected={lng === lang}
          >
            <ListItemText primary={lng === "en" ? "English" : "العربية"} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageButton;
