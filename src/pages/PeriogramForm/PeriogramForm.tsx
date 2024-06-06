import { LoadingButton } from '@mui/lab';
import style from './PeriogramForm.module.css'
import { Box, TextField } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeadTitleSection from '../../global/components/head-section/HeadTitleSection';
import { ChangeEvent, useEffect, useState } from 'react';
import { PeriogramFields } from './types/PeriogramFields';
import usePeriogram from '../../global/hooks/usePeriogram';
import useUsers from '../../global/hooks/useUsers';
import { yupResolver } from '@hookform/resolvers/yup';
import { PeriogramSchema } from './schemas/PeriogramSchema';
import { useForm } from 'react-hook-form';
import useLoading from '../../global/hooks/useLoading';

export default function PeriogramForm() {
    const { id, idPeriogram } = useParams();
    const [imageUrl, setImageUrl] = useState<string>(
      "../../../public/periograma.jpg"
    );
    const { changePhoto } = useUsers();
    const navigate = useNavigate();
    const { createPeriogram, updatePeriogram, getOneById } = usePeriogram();
    const { loading } = useLoading();
    const {
      formState: { errors },
      setValue,
      handleSubmit,
    } = useForm<PeriogramFields>({
      resolver: yupResolver(PeriogramSchema),
      defaultValues: {
        image: "",
      },
    });
  
    useEffect(() => {
      async function getOdontogram() {
        const data = await getOneById(idPeriogram || "");
        setValue("image", data.image);
        setImageUrl(data.image || "../../../public/periograma.jpg");
      }
      if (idPeriogram) {
        getOdontogram();
      }
    }, []);
  
    const onSubmit = async (data: PeriogramFields) => {
      let response = null;
      if (idPeriogram) {
        response = await updatePeriogram(idPeriogram, data);
      } else {
        response = await createPeriogram({ ...data, id_medical_record: id });
      }
      if (response) navigate(`/prontuarios/${id}`);
    };
  
    const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const photo = event.target.files?.[0];
      if (photo) {
        const response = await changePhoto(photo);
        setValue("image", response);
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImageUrl(reader.result);
          }
        };
        reader.readAsDataURL(photo);
      }
    };
  
    return (
      <>
        <HeadTitleSection
          title={idPeriogram ? "Editar Periograma" : "Criar Periograma"}
          backTo={`/prontuarios/${id}`}
        />
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          className={`${style["form-periogram"]} container`}
        >
          <img src={imageUrl} alt="periograma" />
          <small>
            Faça upload da imagem para que seu periograma apareça aqui
          </small>
  
          <Box>
            <TextField
              type="file"
              label="Imagem"
              onChange={handleChangeImage}
              variant="standard"
              color="error"
              fullWidth
            />
            <small
              style={{
                color: "#d62f2f",
              }}
            >
              {!errors.image?.message}
            </small>
          </Box>
  
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={1}
            alignItems={"center"}
          >
            <Link to={`/prontuarios/${id}`}>
              <LoadingButton loading={loading} color="error">
                Voltar
              </LoadingButton>
            </Link>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              color="error"
            >
              Salvar
            </LoadingButton>
          </Box>
        </Box>
      </>
    );
}
