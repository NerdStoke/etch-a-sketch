from raspiGPIOext.motors.stepper import Stepper_ROHS_28BYJ48
from threading import Thread
import sys

def run_stepper(pins,angle,speed):
    Stepper_ROHS_28BYJ48(pins).move_by_angle(angle=angle,speed=speed)

Thread(target=run_stepper, args=([4,17,27,22],sys.argv[0],3.5)).start()
Thread(target=run_stepper, args=([12,16,20,21],sys.argv[1],3.5)).start()