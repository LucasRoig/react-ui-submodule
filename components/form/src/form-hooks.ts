import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useCallback } from "react";
import { FormRoot } from "./components/form-root";
import { SubmitButton } from "./components/submit-button";
import { TextAreaField } from "./fields/text-area-field";
import { TextField } from "./fields/text-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
    FormRoot,
  },
});

export const useFocusFirstInvalidField = (formRef: React.RefObject<HTMLFormElement | null>) =>
  useCallback(() => {
    requestAnimationFrame(() => {
      const invalidInput = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLInputElement;
      if (invalidInput) {
        invalidInput.focus();
        invalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }, [formRef]);

type FormSubmitButtonProps = {
  children: React.ReactNode;
};

export type FormProviderProps<TSuccess> = {
  onSuccess?: (created: TSuccess) => void;
  children: (props: {
    FormBody: () => React.ReactNode;
    FormSubmitButton: (props: FormSubmitButtonProps) => React.ReactNode;
  }) => React.ReactNode;
};
