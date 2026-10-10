import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useCallback } from "react";
import { FormRoot } from "./components/form-root";
import { SubmitButton } from "./components/submit-button";
import { ShadcnComboboxField } from "./fields/shadcn-combobox-field";
import { TextAreaField } from "./fields/text-area-field";
import { TextField } from "./fields/text-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextAreaField,
    ShadcnComboboxField,
  },
  formComponents: {
    SubmitButton,
    FormRoot,
  },
});

export const useFocusFirstInvalidField = (formRef: React.RefObject<HTMLFormElement | null>) =>
  useCallback(() => {
    requestAnimationFrame(() => {
      const form = formRef.current;
      if (!form) {
        return;
      }

      const focusableSelector =
        'input:not([type="hidden"]), textarea, select, button, [role="combobox"], [tabindex]:not([tabindex="-1"])';
      const invalidField = form.querySelector<HTMLElement>('[data-invalid="true"]');
      const invalidControl = form.querySelector<HTMLElement>('[aria-invalid="true"]');

      const findFocusTarget = () => {
        if (invalidField) {
          if (invalidField.matches(focusableSelector)) {
            return invalidField;
          }
          const focusTargetInField = invalidField.querySelector<HTMLElement>(focusableSelector);
          if (focusTargetInField) {
            return focusTargetInField;
          }
        }
        if (invalidControl) {
          if (invalidControl.matches(focusableSelector)) {
            return invalidControl;
          }
          const focusTargetInControl = invalidControl.querySelector<HTMLElement>(focusableSelector);
          if (focusTargetInControl) {
            return focusTargetInControl;
          }
        }
        return null;
      };

      const focusTarget: HTMLElement | null = findFocusTarget();

      if (focusTarget) {
        focusTarget.focus();
        focusTarget.scrollIntoView({ behavior: "smooth", block: "center" });
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
