import { useEffect } from "react";

/** コンポーネントマウント時実行 */
export function useDidMount(func: () => void): void {
  useEffect(() => {
    func();
  }, []);
}
