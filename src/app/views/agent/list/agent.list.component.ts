import { Component } from '@angular/core';

@Component({
  templateUrl: './agent.list.component.html',
  styleUrls: ['./agent.list.component.scss']
})
export class AgentListComponent {
  displayedColumns = ['title', 'agentType', 'number'];
}
