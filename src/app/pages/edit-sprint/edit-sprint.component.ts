import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ScrumUser } from '../../models/ScrumUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../services/project/project.service';
import { SprintService } from '../../services/sprint/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from '../../models/Sprint';

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.scss']
})
export class EditSprintComponent implements OnInit {
  public addSprintForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor(
    private _snackbar: MatSnackBar, private _dialog: MatDialog, private _project: ProjectService, private _sprints: SprintService, private _sprint: SprintService, private _route: ActivatedRoute) {
    this._route.params.subscribe((params) => {
      this._sprint.getSprints(params.project).subscribe(sprints => {
        const sprint = sprints.find(x => x.id == params.sprint);

        this.addSprintForm.get('name').setValue(sprint.name);
        this.addSprintForm.get('startDate').setValue(sprint.startDate.toDate());
        this.addSprintForm.get('endDate').setValue(sprint.endDate.toDate());
      });
    });
  }


  createSprint(data: any): void {

  }
  ngOnInit(): void {
  }

}
