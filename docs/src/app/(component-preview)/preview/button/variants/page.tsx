import { Button } from "../../../../../@design-system/components/button/button";

export default function ButtonPreview() {
  return (
    <div className="flex gap-4">
      <Button type="button" variant="primary" className="btn btn-primary">
        Primary
      </Button>
      <Button type="button" variant="secondary" className="btn btn-secondary">
        Secondary
      </Button>
      <Button type="button" variant="text" className="btn btn-outline">
        Tertiary
      </Button>
    </div>
  );
}
