import { PrimaryButton } from "@/modules/common/PrimaryButton";

interface OAuthProps {
  label: string;
  onClick: any;
}

export const OAuth = ({ label, onClick }: OAuthProps) => {
  return (
    <PrimaryButton
      fontSize={12}
      fontWeight={500}
      color="#000"
      backgroundColor="#fff"
      title={label}
      type="button"
      borderColor="1px solid #000"
      borderRadius="8px"
      height={45}
      width="100%"
      // showLoaderonBtn={true}
      buttonChild={
        <img
          src="/google.svg"
          alt="google"
          style={{ width: "20px", height: "20px", marginRight: "10px" }}
        />
      }
    />
  );
};
