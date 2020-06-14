import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ScrumUser } from '../../models/ScrumUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../services/project/project.service';
import { SprintService } from '../../services/sprint/sprint.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Sprint } from '../../models/Sprint';

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.scss']
})
export class EditSprintComponent implements OnInit {
  sprint: Sprint;
  projectId: string;
  public editSprintForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _project: ProjectService,
    private _sprints: SprintService,
    private _route: ActivatedRoute,
    private _snack: MatSnackBar,
    private _router: Router) {
    this._route.params.subscribe((params) => {
      this.projectId = params.project;
      this._sprints.getSprints(params.project).subscribe(sprints => {
        const sprint = sprints.find(x => x.id === params.sprint);
        this.sprint = sprint;
        this.editSprintForm.get('name').setValue(sprint.name);
        this.editSprintForm.get('startDate').setValue(sprint.startDate.toDate());
        this.editSprintForm.get('endDate').setValue(sprint.endDate.toDate());
      });
    });
  }


  async editSprint(data: any) {
    try{
      await this._sprints.editSprint(this.projectId, this.sprint.id, data);
      this._snack.open(`Successfully updated sprint!`, 'Close', { duration: 2000 });
      await this._router.navigate(['/projects', this.projectId, 'sprints', this.sprint.id]);
    }
    catch (e) {
      this._snack.open(`Failed updating sprint.`, 'Close', { duration: 2000 });
    }
  }

  ngOnInit(): void {

  }
}
