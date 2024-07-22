import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Typography,
} from "@mui/material";
import { DepartmentModel } from "../../../../apis/departments/type";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DepartmentCardProps {
  department: DepartmentModel;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`${department._id}`)}>
        <CardHeader
          title={
            <Typography>
              {department.name.length > 20 ? (
                <>
                  {department.name.slice(0, 20)}
                  <Box component={"span"}>...</Box>
                </>
              ) : (
                t(department.name)
              )}
            </Typography>
          }
        />
      </CardActionArea>
    </Card>
  );
};

export default DepartmentCard;
