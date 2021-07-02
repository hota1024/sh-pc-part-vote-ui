import { CardContent } from '@material-ui/core'
import {
  Card,
  CardActions,
  Typography,
  Button,
  Divider,
} from '@material-ui/core'
import { Part, partTypeToText } from '../types/Part'

/**
 * PartCard props.
 */
export type PartCardProps = {
  part: Part
  totalInType: number
}

/**
 * PartCard component.
 */
export const PartCard: React.VFC<PartCardProps> = (props) => {
  const { part, totalInType } = props
  const percent = (part.votes / (totalInType || 1)) * 100

  return (
    <>
      <Card className="part-card">
        <div className="part-card-voted"></div>
        <CardContent>
          <Typography variant="h6">{part.name}</Typography>
          {part.votes}票({partTypeToText(part.type)}全体の{percent.toFixed(2)}%)
        </CardContent>
        <Divider />
        <CardActions>
          <Button>投票する</Button>
        </CardActions>
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
          right: ${100 - percent}%;
        }
      `}</style>
    </>
  )
}
