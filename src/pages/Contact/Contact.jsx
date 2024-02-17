import "./Contact.scss";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BiSmile, BiEnvelope } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const getValidationSchema = (t) => {
  return yup.object().shape({
    name: yup
      .string()
      .required(t("formErrors.nameRequired"))
      .min(2, "formErrors.nameMinLength"),
    surname: yup
      .string()
      .required(t("formErrors.surnameRequired"))
      .min(2, t("formErrors.surnameMinLength")),
    subject: yup
      .string()
      .required(t("formErrors.subjectRequired"))
      .min(2, t("formErrors.subjectMinLength")),
    email: yup
      .string()
      .required(t("formErrors.emailRequired"))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t("formErrors.emailFormat")
      ),
    message: yup
      .string()
      .required(t("formErrors.messageRequired"))
      .min(10, t("formErrors.messageMinLength"))
      .max(180, t("formErrors.messageMaxLength")),
  });
};

const Contact = () => {
  const { t } = useTranslation(["contact", "header"]);
  const validationSchema = getValidationSchema(t);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    onOpen();
    reset();
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  return (
    <section className="contact">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.contact")}</title>
        </Helmet>
        <h1>{t("contact:pageTitle")}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input
              type="text"
              name="name"
              id="name"
              placeholder={t("contact:formPlaceholders.name")}
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="input">
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder={t("contact:formPlaceholders.surname")}
              {...register("surname")}
            />
            {errors.surname && <p>{errors.surname.message}</p>}
          </div>
          <div className="input">
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder={t("contact:formPlaceholders.subject")}
              {...register("subject")}
            />
            {errors.subject && <p>{errors.subject.message}</p>}
          </div>
          <div className="input">
            <input
              type="text"
              name="email"
              id="email"
              placeholder={t("contact:formPlaceholders.email")}
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="textarea">
            <textarea
              placeholder={t("contact:formPlaceholders.message")}
              rows="8"
              cols="20"
              {...register("message")}
            ></textarea>
            {errors.message && <p>{errors.message.message}</p>}
          </div>
          <button type="submit">{t("submitButton")}</button>
        </form>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.5590084610412!2d49.7648950755498!3d40.418619155525015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40308702f7b54cfd%3A0x3e841458751e0c23!2zTWV5dsmZbGkgdGljYXLJmXQgbcmZcmvJmXpp!5e0!3m2!1sen!2saz!4v1696681455205!5m2!1sen!2saz"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent
          bg="#f5f5f5"
          color="#fff"
          style={{
            border: "1px solid #62a403",
            color: "#62a403",
            height: "200px",
            paddingBottom: "20px",
          }}
        >
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            bg="#62a403"
            style={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "22px",
            }}
          >
            <BiEnvelope style={{ fontSize: "40px" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "10px",
                fontSize: "24px",
              }}
            >
              <p>{t("contact:thankYouText")}</p> <BiSmile />
            </div>
          </AlertDialogHeader>
          <AlertDialogBody style={{ fontSize: "20px" }}>
            {t("contact:successMessage")}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Contact;
