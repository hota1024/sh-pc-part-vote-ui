import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { Typography, Box, TextField, Grid, Button } from '@material-ui/core'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { useAuth } from '../../hooks/useAuth'
import { MainLayout } from '../../layouts/MainLayout'
import {
  Part,
  PartType,
  PartTypes,
  partTypeToText,
  VoteStatus,
} from '../../types/Part'
import { PartCard } from '../../components/PartCard'
import ErrorPage from 'next/error'
import { client } from '../../client/client'
import { Autocomplete, Pagination, Skeleton } from '@material-ui/lab'
import { chunk } from '../../helpers/chunk'

type SortMode = 'vote-desc' | 'vote-asc'

/**
 * PartList page.
 */
export const PartListPage: NextPage = () => {
  const { jwtChecking } = useAuth()
  const router = useRouter()
  const [type, setType] = useState<PartType>()
  const [notFound, setNotFound] = useState(false)
  const [parts, setParts] = useState<Part[]>()
  const [voteStatus, setVoteStatus] = useState<VoteStatus>()
  const [search, setSearch] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [page, setPage] = useState(1)
  const [sortMode, setSortMode] = useState<SortMode>('vote-desc')

  const updateParts = async (type: PartType) => {
    const { data: parts } = await client.get(`/parts/typed/${type}`)
    setParts(parts)

    const { data: voteStatus } = await client.get(`/parts/status`)
    setVoteStatus(voteStatus)
  }

  useEffect(() => {
    if (!router.query.partType) return

    const partType = router.query.partType as PartType

    if (PartTypes.includes(partType)) {
      setType(partType)
      updateParts(partType)
    } else {
      setNotFound(true)
    }
  }, [router.query])

  if (notFound) {
    return <ErrorPage statusCode={404} />
  }

  const displayParts = () => {
    if (!parts) return []
    let displays =
      search === '' ? parts : parts.filter(({ name }) => name.includes(search))

    if (sortMode === 'vote-desc') {
      displays = displays.sort((a, b) => (a.votes < b.votes ? 1 : -1))
    } else {
      displays = displays.sort((a, b) => (a.votes < b.votes ? -1 : 1))
    }

    const pages = chunk(displays, 20)

    if (page > pages.length) {
      setPage(pages.length)
    }

    return pages
  }

  const pages = displayParts()

  return (
    <MainLayout>
      <Typography variant="h4" align="center">
        {partTypeToText(type)}
      </Typography>
      <Typography variant="h6" align="center">
        {voteStatus && `現在${voteStatus[type]}票`}
      </Typography>

      {parts && voteStatus && !jwtChecking ? (
        <>
          <Box my={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Autocomplete
                  options={parts.map(({ name }) => name)}
                  getOptionLabel={(name) => name}
                  inputValue={search}
                  onInputChange={(_, value) => setSearch(value ?? '')}
                  onChange={(_, value) => setSearch(value ?? '')}
                  freeSolo
                  onOpen={() => setSearchFocus(true)}
                  onClose={() => setSearchFocus(false)}
                  renderInput={(params) => (
                    <TextField {...params} label="検索" variant="filled" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  className="toggle-sort-mode"
                  size="large"
                  fullWidth
                  variant="contained"
                  disableElevation
                  startIcon={
                    sortMode === 'vote-desc' ? (
                      <ArrowUpward />
                    ) : (
                      <ArrowDownward />
                    )
                  }
                  onClick={() =>
                    setSortMode((mode) =>
                      mode === 'vote-desc' ? 'vote-asc' : 'vote-desc'
                    )
                  }
                >
                  {sortMode === 'vote-desc' ? '投票が多い順' : '投票が少ない順'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          {!searchFocus && (
            <>
              {pages[page - 1].map((p) => (
                <Box key={p.id} my={2}>
                  <PartCard part={p} totalInType={voteStatus[p.type]} />
                </Box>
              ))}

              <Box my={4}>
                <Grid container justify="center">
                  <Pagination
                    count={pages.length}
                    color="primary"
                    page={page}
                    onChange={(_, page) => {
                      scroll.scrollToTop({ duration: 300 })
                      setPage(page)
                    }}
                  />
                </Grid>
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          {[...Array(5)].map((_, key) => (
            <Box key={key} my={2}>
              <Skeleton variant="rect" height={140} />
            </Box>
          ))}
        </>
      )}
    </MainLayout>
  )
}

export default PartListPage
