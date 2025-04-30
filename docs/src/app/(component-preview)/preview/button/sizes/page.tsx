import { Button } from "../../../../../@design-system/components/button/button";

export default function ButtonSizesPreview() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-lg font-bold">Large</p>
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
      </div>
      <div>
        <p className="text-lg font-bold">Default</p>
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
      </div>
      <div>
        <p className="text-lg font-bold">Small</p>
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
      </div>
    </div>
  );
}
