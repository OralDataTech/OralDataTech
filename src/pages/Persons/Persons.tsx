import { Box, Button } from "@mui/material";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import useUsers from "../../global/hooks/useUsers";
import { useEffect, useState } from "react";
import { User } from "../../global/types/User";
import style from "./Persons.module.css";
import CardUser from "../../global/components/card-user/CardUser";
import useIcons from "../../global/hooks/useIcons";
import { Link } from "react-router-dom";
import useAuth from "../../global/hooks/useAuth";
import HeaderResults from "../../global/components/header-results/HeaderResults";

export default function Persons() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { getAll } = useUsers();
  const { AddRoundedIcon } = useIcons();
  const { isAdmin } = useAuth();
  const [trigger, setTrigger] = useState(false);

  async function fetch(triggerOrigin?: boolean) {
    const response = await getAll(triggerOrigin ? 1 : page, 10);
    if (triggerOrigin) {
      setUsers(response.results);
    } else {
      setUsers(() => [...users, ...response.results]);
    }
    setTotalPages(response.total_pages);
    setTotalResults(response.total_results);
  }

  useEffect(() => {
    fetch();
  }, [page]);

  useEffect(() => {
    fetch(true);
  }, [trigger]);

  return (
    <Box>
      <HeadTitleSection backTo="/" title="Usuários" />
      <Box className={`${style["users-container"]} container`}>
        <HeaderResults>
          {isAdmin() && (
            <Link to={"create"}>
              <Button
                startIcon={<AddRoundedIcon />}
                variant="contained"
                color="error"
              >
                Novo
              </Button>
            </Link>
          )}
          <small>
            {users.length} resultado(s) de {totalResults} resultado(s)
          </small>
        </HeaderResults>

        {users.map((user) => (
          <CardUser
            dispachTrigger={() => setTrigger(!trigger)}
            key={user.id}
            user={user}
          />
        ))}
        {page < totalPages && (
          <Button
            onClick={() => setPage(page + 1)}
            variant="contained"
            color="error"
          >
            Ver mais
          </Button>
        )}
      </Box>
    </Box>
  );
}
