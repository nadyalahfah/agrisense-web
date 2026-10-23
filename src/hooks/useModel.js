import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export function useModel() {
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // Memuat model dari folder public/tfjs_model/
        const loaded = await tf.loadLayersModel("/tfjs_model_final/model.json");
        if (mounted) {
          setModel(loaded);
          setStatus("ready");
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Gagal memuat model");
          setStatus("error");
        }
      }
    }

    load();
    
    // Cleanup function jika komponen di-unmount
    return () => {
      mounted = false;
    };
  }, []);

  return { model, status, error };
}