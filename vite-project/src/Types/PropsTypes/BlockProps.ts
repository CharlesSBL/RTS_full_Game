export default interface BlockProps {
  idNumber: number;
  position?:
    | {
        x: number;
        y: number;
      }
    | undefined;
  size?: number | undefined;
  color?: string | undefined;
}
