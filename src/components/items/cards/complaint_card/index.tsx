import {
  ComplaintInputModel,
  ComplaintModel,
} from "../../../../apis/complaints/type";
import { useEditComplaintMutation } from "../../../../apis/complaints/queries";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ComplaintCardProps {
  complaint: ComplaintModel;
}

const ComplaintCard = ({ complaint }: ComplaintCardProps) => {
  const { t } = useTranslation();
  const { mutate: editComplaint } = useEditComplaintMutation();

  const initialValues: ComplaintInputModel = {
    _id: complaint._id,
    reply: complaint.reply ?? "",
  };
  const handleSubmit = (
    values: ComplaintInputModel,
    { setSubmitting }: FormikHelpers<ComplaintInputModel>
  ) => {
    editComplaint(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {complaint.address}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {complaint.text}
        </Typography>
        {complaint.createdAt && (
          <Typography variant="caption" color="text.secondary">
            {format(new Date(complaint.createdAt), "PPP")}
          </Typography>
        )}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, isSubmitting, handleChange, touched, errors }) => (
            <Form>
              <TextField
                fullWidth
                id="reply"
                name="reply"
                label="reply"
                multiline
                minRows={1}
                value={values.reply}
                onChange={handleChange}
                error={touched.reply && Boolean(errors.reply)}
                helperText={touched.reply && errors.reply}
                sx={{ mb: 2, mt: 3 }}
              />
              {/* <TextareaAutosize
                id="reply"
                title="reply"
                name="reply"
                placeholder="reply"
                minRows={3}
                //   type="text"
                value={values.reply}
                onChange={handleChange}
                style={{
                  marginBottom: 2,
                  marginTop: 2,
                  padding: 7,
                  border: "1px solid gray",
                  borderRadius: 3,
                  width: "100%",
                }}
              /> */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {t("submit_reply")}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;
