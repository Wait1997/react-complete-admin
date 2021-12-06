export interface FormProps {
  initialValues?: Record<string, string>
  className?: string
  onFinish?: (values: any) => void
  onFinishFailed?: ({ values, errorFields }: { values: any; errorFields: any }) => void
}
