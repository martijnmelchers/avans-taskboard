import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../services/project/project.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private _project: ProjectService) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return await this._project.isInProject(next.params.project);
  }

}
