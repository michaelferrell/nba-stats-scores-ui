import React from "react"
import { Table } from "semantic-ui-react"
import styled from "styled-components"

const StyledTable = styled.table`
	&.ui.inverted.table {
		margin-bottom: 2em;
		background-color: inherit;
	}
`

const RowHover = styled.tr`
	&:hover td {
		background-color: #444;
	}
`

const SecondaryStat = styled.span`
	opacity: 0.5;
	font-size: 0.95em;
	margin-left: 0.2em;
`

export default ({ data }) => (
	<Table as={StyledTable} unstackable inverted>
		<thead>
			<Table.Row>
				<th>Player</th>
				<th class="center aligned">Min</th>
				<th class="center aligned">Pts</th>
				<th class="center aligned">Reb</th>
				<th class="center aligned">Ast</th>
				<th class="center aligned">Fg</th>
				<th class="center aligned">Fg%</th>
				<th class="center aligned">3p</th>
				<th class="center aligned">3p%</th>
				<th class="center aligned">Ft</th>
				<th class="center aligned">+/-</th>
			</Table.Row>
		</thead>
		<tbody>
			{data.map(key => {
				let player_name = key.name ? key.name : key.personId
				let points = parseInt(key.points)
				if (points >= 20) {
					points = <span class="text-green">{points}</span>
				}
				let assists = parseInt(key.assists)
				if (assists >= 10) {
					assists = <span class="text-green">{assists}</span>
				}
				let rebounds = parseInt(key.totReb)
				if (rebounds >= 10) {
					rebounds = <span class="text-green">{rebounds}</span>
				}
				return (
					<Table.Row key={key.personId} as={RowHover}>
						<td>
							{player_name}
							{key.pos && <SecondaryStat> ({key.pos})</SecondaryStat>}
						</td>
						<td class="center aligned">{key.min}</td>
						<td class="center aligned">{points}</td>
						<td class="center aligned">{rebounds}</td>
						<td class="center aligned">{assists}</td>
						<td class="center aligned">
							{key.fgm}/{key.fga}
						</td>
						<td class="center aligned">
							<SecondaryStat>{key.fgp}%</SecondaryStat>
						</td>
						<td class="center aligned">
							{key.tpm}/{key.tpa}
						</td>
						<td class="center aligned">
							<SecondaryStat>{key.tpp}%</SecondaryStat>
						</td>
						<td class="center aligned">
							{key.ftm}/{key.fta}
						</td>
						<td class="center aligned">{key.plusMinus}</td>
					</Table.Row>
				)
			})}
		</tbody>
	</Table>
)
