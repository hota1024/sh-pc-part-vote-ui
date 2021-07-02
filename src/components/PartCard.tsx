import { CardContent } from '@material-ui/core'
import {
  Card,
  CardActions,
  Typography,
  Button,
  Divider,
} from '@material-ui/core'
import { useAtom } from 'jotai'
import { useConfirm } from 'material-ui-confirm'
import { client } from '../client/client'
import { authHeaderAtom, jwtAtom, userAtom } from '../store/jwt'
import { votingAtom } from '../store/vote'
import { Part, partTypeToText } from '../types/Part'
import { User } from '../types/User'

/**
 * PartCard props.
 */
export type PartCardProps = {
  part: Part
  totalInType: number
  readonly?: boolean
  onUpdate?: () => void
}

/**
 * PartCard component.
 */
export const PartCard: React.VFC<PartCardProps> = (props) => {
  const [jwt] = useAtom(jwtAtom)
  const [headers] = useAtom(authHeaderAtom)
  const [user, setUser] = useAtom(userAtom)
  const [voting, setVoting] = useAtom(votingAtom)
  const { readonly, part, totalInType } = props
  const percent = (part.votes / (totalInType || 1)) * 100
  const confirm = useConfirm()

  const onVoteClick = async () => {
    const votedPart = user.status[part.type]

    if (votedPart) {
      confirm({
        title: '既に投票しているパーツがあります。投票を切り替えますか？',
        description: (
          <>
            <p>
              既に投票しているパーツ
              <PartCard part={votedPart} totalInType={totalInType} readonly />
            </p>
            <p>
              投票を切り替えようとしているパーツ
              <PartCard part={part} totalInType={totalInType} readonly />
            </p>
          </>
        ),
      }).then(async () => {
        setVoting(true)
        const { data } = await client.post<User>(
          `/parts/${part.id}/vote`,
          {},
          { headers }
        )
        setUser(data)
        setVoting(false)
        props.onUpdate && props.onUpdate()
      })
      return
    }

    setVoting(true)
    const { data } = await client.post<User>(
      `/parts/${part.id}/vote`,
      {},
      { headers }
    )
    setUser(data)
    setVoting(false)
    props.onUpdate && props.onUpdate()
  }

  const onUnVoteClick = async () => {
    setVoting(true)
    const { data } = await client.delete<User>(`/parts/${part.id}/vote`, {
      headers,
    })
    setUser(data)
    setVoting(false)
    props.onUpdate && props.onUpdate()
  }

  return (
    <>
      <Card className="part-card">
        <div
          className="part-card-voted"
          style={{ right: `${100 - percent}%` }}
        ></div>
        <CardContent>
          <Typography variant="h6">{part.name}</Typography>
          {typeof part.votes !== 'undefined' && (
            <>
              {part.votes}票({partTypeToText(part.type)}全体の
              {percent.toFixed(2)}%)
            </>
          )}
        </CardContent>
        {!readonly && user && part && (
          <>
            <Divider />
            <CardActions>
              {user.status[part.type]?.id === part.id ? (
                <Button
                  color="secondary"
                  variant="text"
                  disabled={!jwt || voting}
                  onClick={onUnVoteClick}
                >
                  投票を取り消す
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="text"
                  disabled={!jwt || voting}
                  onClick={onVoteClick}
                >
                  投票する
                </Button>
              )}
            </CardActions>
          </>
        )}
      </Card>

      <style global jsx>{`
        .part-card {
          position: relative;
        }

        .part-card-voted {
          background: rgba(80, 201, 252, 0.2);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          transition: all 200ms ease;
        }
      `}</style>
    </>
  )
}
