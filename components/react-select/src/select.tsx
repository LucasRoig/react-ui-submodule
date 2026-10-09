import type { GroupBase, Props as SelectProps } from "react-select";
import ReactSelect from "react-select";
import type { CreatableProps } from "react-select/creatable";
import CreatableSelect from "react-select/creatable";

const commonProps = {
  menuPortalTarget: typeof document === "undefined" ? undefined : document.body,
  menuPosition: "fixed" as const,
  styles: {
    // biome-ignore lint/suspicious/noExplicitAny: We don't want to write what this type actually is.
    menuPortal: (base: any) => ({ ...base, zIndex: 60, pointerEvents: "auto" }),
  },
};

export function AutoComplete<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectProps<Option, IsMulti, Group>) {
  return <ReactSelect {...props} {...commonProps} />;
}

export function CreatableAutocomplete<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: CreatableProps<Option, IsMulti, Group>) {
  return <CreatableSelect {...props} {...commonProps} />;
}
export type BasicSelectOption = {
  label: string;
  value: string;
};
