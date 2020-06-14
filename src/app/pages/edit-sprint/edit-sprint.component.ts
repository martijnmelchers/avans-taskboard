import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ScrumUser } from '../../models/ScrumUser';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
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
  public editSprintForm: FormGroup;
  constructor(
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _project: ProjectService,
    private _sprints: SprintService,
    private _route: ActivatedRoute,
    private _snack: MatSnackBar,
    private _router: Router, private fb: FormBuilder) {

    this.editSprintForm = this.fb.group({
      name:[null,[Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null, []]
    }, {validators: this.endDateValidator});

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
  private endDateValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => { // here we have the 'passwords' group
    const endDate = group.get('endDate').value;
    const startDate = group.get('startDate').value;
    if (!endDate || !startDate){
      return null;
    }
    return (endDate <= startDate)  ? { before: true } : null;
  }
  ngOnInit(): void {

  }
}
